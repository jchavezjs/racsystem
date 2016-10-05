angular.module('rac.controllers',[])
  // AQUI ESTAN LOS CONTROLADORES
  .controller('MainController',function($scope){

  })
  .controller('HeaderController',function($scope,$http,$location){
    $scope.session = false;
    $http.get('php/userdata.php').success(function(response){
      if(response.status != null){
        $scope.session = true;
      }else{
        $location.path('/');
      }
    });
    $scope.login = function(user,pass){
      $http.post('php/login.php',{'user':user, 'pass':pass}).success(function(response){
        if(response.status == 1){
          $scope.session = true;
        }
      });
    };
    $scope.close = function(){
      $http.get('php/logout.php').success(function(){
        $location.path('/');
        $scope.session = false;
      });
    };
  })
  .controller('ProfileController',function($scope, $http){
    $http.get('php/profile.php').success(function(response){
      $scope.nombres = response.nombres;
      $scope.apellidos = response.apellidos;
      $scope.fecha = response.fecha;
      $scope.ingreso = response.ingreso;
      $scope.email = response.email;
      $scope.trabajo = response.trabajo;
      if(response.sexo == 1){
        $scope.sexo = 1;
      }else{
        $scope.sexo = 0;
      }
      $scope.civil = response.civil;
      $scope.cargo = response.cargo;
      $scope.telefono = response.telefono;
      $scope.estudios = response.estudios;
      $scope.nacionalidad = response.nacionalidad;
      $scope.calificacion = response.calificacion;
      $scope.conyugue = response.nombre_co + " " + response.apellido_co;

      $scope.foto = response.foto;
    });
  })
  .controller('NuevaController',function($scope, $routeParams, $http, $location){
    var id = $routeParams.id;
    $scope.product = null;
    $http.get('php/solicitud.php').success(function(response){
      if(id != 0){
        for(var x in response.productos){
          if(response.productos[x].id == id){
            $scope.product = response.productos[x];
          }
        }
      }
      $scope.productos = response.productos;
      $scope.plazos = response.plazos;
      $scope.tiendas = response.tiendas;
    });
    $scope.confirmarSolicitud = function(producto, cantidad, financiamiento, descuento, prima, plazo, tienda, aceptar){
      if(aceptar){
        if(!isNaN(cantidad) && cantidad != undefined && !isNaN(descuento) && descuento != undefined && !isNaN(prima) && prima != undefined && plazo != undefined && tienda != undefined){
          $http.post('php/nuevaSolicitud.php',{'producto': producto, 'cantidad': cantidad, 'financiamiento': financiamiento, 'descuento': descuento, 'prima': prima, 'plazo': plazo, 'tienda': tienda}).success(function(response){
            alert("Solicitud recibida éxitosamente :)");
            $location.path('/solicitudes');
          });
        }else{
          alert("Complete correctamente todos los campos");
        }
      }else{
        alert("Debe aceptar los terminos y condiciones para solicitar un producto");
      }
    }
  })
  .controller('SolicitudesController',function($scope){
    $scope.solicitudes = [
      {
        foto: "img/camara.png",
        nombre: "Cámara Nikon 1080p",
        iniciado: "2016-07-01",
        estado: "Díctado",
        fechaestado: "2016-07-07",
        comentarios: "Todo se encuentra correcto.",
        porcentaje: "80%"
      },
      {
        foto: "img/tv.png",
        nombre: "Televisor LCD",
        iniciado: "2016-06-01",
        estado: "Revisión teléfonica",
        fechaestado: "2016-07-01",
        comentarios: "Procesando información",
        porcentaje: "20%"
      },
    ];
  })

  .controller('ProductController',function($scope, $http){
    $http.get('php/productos.php').success(function(response){
      $scope.items = response.productos;
    });
  })
