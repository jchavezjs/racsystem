<?php
  include('connection.php');
  session_start();
  $producto = $data_input -> producto;
  $cantidad = $data_input -> cantidad;
  $financiamiento = $data_input -> financiamiento;
  $descuento = $data_input -> descuento;
  $prima = $data_input -> prima;
  $plazo = $data_input -> plazo;
  $tienda = $data_input -> tienda;
  $cliente = $_SESSION["id"];
  $dia = date("Y-m-d");
  $hora = date("H:i:s");

  $query = $mysqli->query("INSERT INTO cotizacion_credito(id_producto,cantidad,financiamiento,descuento,v_prima,id_plazo) 
                        VALUES($producto,$cantidad,$financiamiento,$descuento,$prima,$plazo)");

  $queryid = $mysqli->query("SELECT MAX(id_cotizacion) from cotizacion_credito");

  $cot = $queryid->fetch_array(MYSQLI_NUM);

  $idCot = $cot[0];

  $query2 = $mysqli->query("INSERT INTO solicitud(id_tienda,fecha_solicitud,hora_solicitud,id_employee,id_cliente,id_cotizacion,id_estol)
                        VALUES($tienda,'$dia','$hora',1,$cliente,$idCot,1)");

//   if($query){
//     echo json_encode(array(
//       "productos" => $productos,
//       "plazos" => $plazos,
//       "tiendas" => $tiendas
//     ));
//   }else{
//     echo json_encode(array(
//       "productos" => "No"
//     ));
//   }
 ?>