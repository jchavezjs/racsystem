angular.module('rac',['rac.controllers','ngRoute','ui.materialize'])
  .config(function($routeProvider,$locationProvider){
    $routeProvider
            .when("/", {
                controller: "admin",
                templateUrl: "templates/admin.html"
            })
            .when("/adminproductos",{
              controller: "AdminproductosController",
              templateUrl:"templates/adminproductos.html"
            })
            .when("/adminsol", {
                controller: "adminsol",
                controller: "AdminsolController",
                templateUrl: "templates/adminsol.html"
            })
            .when("/solicitud",{
              controller: "solicitudController",
              templateUrl:"templates/solicitud.html"
            })
            
            .otherwise({
               redirectTo: "/"
           });
  })

  .component('mainHeader',{
    templateUrl: "templates/header.html",
    controller: "HeaderController"
  })
