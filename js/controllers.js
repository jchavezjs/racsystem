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
  .controller('ProfileController',function($scope, $http, Upload){
    $http.get('php/profile.php').success(function(response){
      $scope.studys = response.estudios;
      $scope.viviendas = response.viviendas;
      $scope.nacionalidades = response.nacionalidades;
      $scope.estados = response.estados;
      $scope.nombres = response.perfil.nombres;
      $scope.apellidos = response.perfil.apellidos;
      $scope.fecha = response.perfil.fecha;
      $scope.ingreso = response.perfil.ingreso;
      $scope.email = response.perfil.email;
      $scope.trabajo = response.perfil.trabajo;
      if(response.sexo == 1){
        $scope.sexo = 1;
      }else{
        $scope.sexo = 0;
      }
      $scope.civil = response.perfil.civil;
      $scope.cargo = response.perfil.cargo;
      $scope.telefono = response.perfil.telefono;
      $scope.estudios = response.perfil.estudios;
      $scope.nacionalidad = response.perfil.nacionalidad;
      $scope.calificacion = response.perfil.calificacion;
      $scope.conyugue = response.perfil.nombre_co + " " + response.perfil.apellido_co;

      $scope.foto = response.perfil.foto;
      var currentTime = new Date($scope.fecha);
      console.log()
      $scope.currentTime = currentTime;
      $scope.month = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
      $scope.monthShort = ['En', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
      $scope.weekdaysFull = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sábado'];
      $scope.weekdaysLetter = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
      $scope.disable = [false, 1, 7];
      $scope.today = 'Hoy';
      $scope.clear = 'Limpiar';
      $scope.close = 'Cerrar';
    });

     $scope.uploadFiles = function(file, errFiles) {
           $scope.f = file;
           
          $scope.foto = 'img/'+file.name;
           $scope.errFile = errFiles && errFiles[0];
           if (file) {
               file.upload = Upload.upload({
                   url: 'php/editarPerfil.php?tipo=img',
                   data: {file: file}
               });

               file.upload.then(function (response) {
                   $timeout(function () {
                       file.result = response.data;
                   });
               }, function (response) {
                   if (response.status > 0)
                       $scope.errorMsg = response.status + ': ' + response.data;
               }, function (evt) {
                   file.progress = Math.min(100, parseInt(100.0 *
                                            evt.loaded / evt.total));
               });
           }
           
        };

        $scope.editar = function(email, sexo, fecha, trabajo, vivienda, cargo, telefono, estado, nacionalidad, estudio, ingreso, foto){
          alert("entro");
          $http.post('php/editarPerfil.php?tipo=1',{'email': email, 'sexo':sexo, 'fecha':fecha, 'trabajo': trabajo, 'vivienda': vivienda,'cargo': cargo, 'telefono': telefono, 'estado': estado, 'nacionalidad': nacionalidad, 'estudio': estudio, 'ingreso': ingreso, 'foto': foto}).success(function(response){
            alert("exito");
          });
        }
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
  .controller('SolicitudesController',function($scope, $http){
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
    $http.get('php/solicitudes.php').success(function(response){
      $scope.solicitudes = response.solicitudes;
    });
  })

  .controller('ProductController',function($scope, $http){
    $http.get('php/productos.php').success(function(response){
      $scope.items = response.productos;
    });
  })
