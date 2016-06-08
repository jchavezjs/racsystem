angular.module('pad',['pad.controllers','ngRoute'])
  .config(function($routeProvider,$locationProvider){
    $routeProvider
            .when("/", {
                controller: "MainController",
                templateUrl: "templates/mainpad.html"
            })
            .otherwise({
               redirectTo: "/"
           });
  })
