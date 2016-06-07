angular.module('rac',['rac.controllers','ngRoute'])
  .config(function($routeProvider,$locationProvider){
    $routeProvider
            .when("/", {
                controller: "MainController",
                templateUrl: "templates/main.html"
            })
            .when("/perfil",{
              controller: "ProfileController",
              templateUrl:"templates/profile.html"
            })
            .when("/productos",{
              controller: "ProductController",
              templateUrl:"templates/productos.html"
            })
            .when("/solicitudes",{
              controller: "SolicitudesController",
              templateUrl:"templates/solicitudes.html"
            })
  })
