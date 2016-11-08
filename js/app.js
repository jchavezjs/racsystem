angular.module('rac',['rac.controllers','ngRoute','ui.materialize','ngFileUpload'])
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

.directive("fileread", [function () {
    return {
        scope: {
            fileread: "="
        },
        link: function (scope, element, attributes) {
            element.bind("change", function (changeEvent) {
                var reader = new FileReader();
                reader.onload = function (loadEvent) {
                    scope.$apply(function () {
                        scope.fileread = loadEvent.target.result;
                    });
                }
                reader.readAsDataURL(changeEvent.target.files[0]);
            });
        }
    }
}])