angular.module('rac.controllers',[])

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
      console.log(user);
      console.log(pass);
      $http.post('php/login.php',{'user':user, 'pass':pass}).success(function(response){
        if(response.status){
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
  .controller('ProfileController',function($scope){

  })
  .controller('NuevaController',function($scope){

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
