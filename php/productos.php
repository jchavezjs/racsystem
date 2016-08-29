<?php
  include('connection.php');

  $query = $mysqli->query("SELECT p.id_producto, p.nombre_producto, p.precio, p.foto, p.stock,
                          t.nombre_categoria, i.tasa_interes, m.nombre_marca, mo.nombre_modelo
                          FROM productos p, tipo_producto t, interes i, marca m, modelo mo
                          WHERE p.id_tipoprod = t.id_tipoprod and p.id_marca = m.id_marca and p.id_modelo = mo.id_modelo
                          and t.id_interes = i.id_interes");
  if($query){
    while($res = $query->fetch_array(MYSQLI_ASSOC)){
      $productos[] = array(
        "id" => $res['id_producto'],
        "nombre" => $res['nombre_producto'],
        "precio" => $res['precio'],
        "foto" => $res['foto'],
        "stock" => $res['stock'],
        "categoria" => $res['nombre_categoria'],
        "interes" => $res['tasa_interes'],
        "marca" => $res['nombre_marca'],
        "modelo" => $res['nombre_modelo'],
      );
    }
    echo json_encode(array(
      "productos" => $productos
    ));
  }else{
    echo json_encode(array(
      "productos" => "No"
    ));
  }
 ?>
