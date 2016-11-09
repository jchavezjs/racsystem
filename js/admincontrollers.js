angular.module('admin.controllers',[])
  // AQUI ESTAN LOS CONTROLADORES
  .controller('SolicitudController',function($scope, $http){
      $http.get("php/reporteSolicitud.php").success(function(response){
          $scope.solicitudes = response.solicitudes;
          $scope.productoM = response.productoM;
          $scope.primaTotal = response.primaTotal;
          $scope.financiamiento = response.financiamiento;
          $scope.tienda = response.tienda;
      });

    $scope.openPdf = function(solicitudes, producto, fin, prim, tienda) {
        var f = new Date();
        var docDefinition = {
        content: [
            {
                text: 'Reporte de solicitudes recibidas', margin: [ 0, 0, 0, 10 ], color: '#4DB6AC', fontSize: 18
            },
            {
                text: 'Fecha: ' + f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear(), margin: [ 0, 0, 0, 40 ], fontSize: 10
            },
            // {
            //     image: './h.jpg',
            //     width: 150,
            //     height: 150
            // },
            {
                columns: [
				{
					text: 'Mejor producto:\n\n' + producto, alignment: 'center', margin: [ 0, 0, 0, 40 ], color: '#795548'
				},
				{
					text: 'Máximo financiado:\n\n$' + fin, alignment: 'center', color: '#795548'
				},
				{
					text: 'Primas totales:\n\n$' + prim, alignment: 'center', color: '#795548'
				},
                {
					text: 'Mejor tienda:\n\n' + tienda, alignment: 'center', color: '#795548'
				}
			]
            },           
            {
                style: 'demoTable',
                layout: 'lightHorizontalLines',
                table: {
                widths: [10, 40, 30, 30, 60, 60, 50, 20, 20, 55],
                body: [
                    [{text: 'Id', style: 'header'}, {text: 'Tienda', style: 'header'},
                    {text: 'Fecha', style: 'header'}, {text: 'Hora', style: 'header'}, {text: 'Empleado', style: 'header'}, {text: 'Cliente', style: 'header'}, {text: 'Producto', style: 'header'}, {text: 'Prima', style: 'header'}, {text: 'Finan.', style: 'header'}, {text: 'Estado', style: 'header'}
                    ]
                ]
                }
            }
            ],
            footer: {
                columns: [
                { text: 'RAC System', alignment: 'right', margin: [ 0, 0, 10, 0 ], color: '#6A7286' }
                ]
            },
            styles: {
            header: {
                bold: true,
                color: '#000',
                fontSize: 11,
                fillColor: '#F2F2F2'
            },
            demoTable: {
                color: '#666',
                fontSize: 10,
            }
            }
        };
        for(var x = 1; x<=solicitudes.length; x++){
            docDefinition.content[3].table.body[x] = [solicitudes[x-1].id, solicitudes[x-1].tienda, solicitudes[x-1].fecha, solicitudes[x-1].hora, solicitudes[x-1].empleado, solicitudes[x-1].cliente, solicitudes[x-1].producto, solicitudes[x-1].prima, solicitudes[x-1].financiamiento, solicitudes[x-1].estado];
        }
        pdfMake.createPdf(docDefinition).open();
    };
  })