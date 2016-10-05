<?php
  include('connection.php');

  $query = $mysqli->query("SELECT p.id_producto, p.nombre_producto, p.precio, p.foto, p.stock,
                          t.nombre_categoria, i.tasa_interes, m.nombre_marca, mo.nombre_modelo
                          FROM productos p, tipo_producto t, interes i, marca m, modelo mo
                          WHERE p.id_tipoprod = t.id_tipoprod and p.id_marca = m.id_marca and p.id_modelo = mo.id_modelo
                          and t.id_interes = i.id_interes");

  $query2 = $mysqli->query("SELECT p.id_plazo, p.meses_plazo FROM plazos p");

  $query3 = $mysqli->query("SELECT t.id_tienda, t.nombre_tienda FROM tienda t");

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
    while($res2 = $query2->fetch_array(MYSQLI_ASSOC)){
        $plazos[] =array(
            "id" => $res2['id_plazo'],
            "meses" => $res2['meses_plazo']
        );
    }
    while($res3 = $query3->fetch_array(MYSQLI_ASSOC)){
        $tiendas[] =array(
            "id" => $res3['id_tienda'],
            "nombre" => $res3['nombre_tienda']
        );
    }
    echo json_encode(array(
      "productos" => $productos,
      "plazos" => $plazos,
      "tiendas" => $tiendas
    ));
  }else{
    echo json_encode(array(
      "productos" => "No"
    ));
  }
 ?>