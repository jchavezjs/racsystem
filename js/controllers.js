angular.module('rac.controllers',[])

  .controller('MainController',function($scope){

  })
  .controller('ProfileController',function($scope){

  })
  .controller('SolicitudesController',function($scope){
    $scope.solicitudes = [
      {
        foto: "",
        nombre: "",
        iniciado: "",
      },
    ];
  })

  .controller('ProductController',function($scope){
    $scope.items = [
      {
        nombre: "Plancha modelo 3x",
        precio: 30,
        descripcion: "Una plancha increíble. La reina de las planchas.",
        sucursal: "Las Cascadas",
        foto: "img/plancha.jpg"
      },
      {
        nombre: "Televisor LCD",
        precio: 5000,
        descripcion: "Máxima resolución en cada fotograma.",
        sucursal: "Multiplaza",
        foto: "img/tv.png"
      },
      {
        nombre: "Audífonos SONY",
        precio: 80,
        descripcion: "Una increíble expriencia de sonido.",
        sucursal: "Las Cascadas",
        foto: "img/audifonos.jpg"
      },
      {
        nombre: "Laptop HP 1000",
        precio: 1000,
        descripcion: "Laptop de alta gama con 1 año de garantía.",
        sucursal: "La gran vía",
        foto: "img/laptop.png"
      },
      {
        nombre: "Cámara Nikon 1080p",
        precio: 90,
        descripcion: "Resolución de full HD en cada toma.",
        sucursal: "Las Cascadas",
        foto: "img/camara.png"
      },
      {
        nombre: "iPad",
        precio: 950,
        descripcion: "Trabaja desde donde desees.",
        sucursal: "La gran vía",
        foto: "img/ipad.png"
      },
      {
        nombre: "iMac",
        precio: 1600,
        descripcion: "Trabaja con una gran experiencia de usuario y hermoso diseño",
        sucursal: "La gran vía",
        foto: "img/imac.jpg"
      },
      {
        nombre: "iPod",
        precio: 50,
        descripcion: "Escucha música adonde quiera que vayas",
        sucursal: "La gran vía",
        foto: "img/ipod.jpg"
      }
    ];
  })
