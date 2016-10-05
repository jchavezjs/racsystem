angular.module('rac',['rac.controllers','ngRoute','ui.materialize'])
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
            .when("/nueva-solicitud/:id",{
              controller: "NuevaController",
              templateUrl:"templates/nueva-solicitud.html"
            })
            .when("/login",{
              controller: "LoginController",
              templateUrl:"templates/login.html"
            })
            .otherwise({
               redirectTo: "/"
           });
  })

  .component('mainHeader',{
    templateUrl: "templates/header.html",
    controller: "HeaderController"
  })
