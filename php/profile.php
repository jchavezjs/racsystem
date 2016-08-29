<?php
  include('connection.php');
  session_start();
  $id = $_SESSION["id"];

  $query = $mysqli->query("SELECT c.primer_apellido, c.segundo_apellido, c.primer_nombre, c.segundo_nombre, c.fecha_nacimiento,
                          c.money_income, c.email, c.lugar_trabajo, c.id_sexo, c.id_estado_civil, p.name_cargo, t.tel_celular, e.nombre_nestudios,
                          n.nombre_nac, ca.letra_calificacion, co.primer_nombre as nombre_co, co.primer_apellido as apellido_co, c.foto
                          FROM cliente c, telefono t, nivel_estudios e, nacionalidad n, calificacion ca, conyuge_clien co, position p
                          WHERE c.id_telefono = t.id_telefono and c.id_nivel_estudios = e.id_nivel_estudios and c.id_nacionalidad = n.id_nacionalidad
                          and c.id_calificacion = ca.id_calificacion and c.id_conyugecli = co.id_conyuge_cli and c.id_cargo = p.id_cargo and c.id_cliente = $id");

  $row = $query->fetch_assoc();

  echo json_encode(array(
    "nombres" => $row['primer_nombre'],
    "apellidos" => $row['primer_apellido'],
    "fecha" => $row['fecha_nacimiento'],
    "ingreso" => $row['money_income'],
    "email" => $row['email'],
    "trabajo" => $row['lugar_trabajo'],
    "sexo" => $row['id_sexo'],
    "civil" => $row['id_estado_civil'],
    "cargo" => $row['name_cargo'],
    "telefono" => $row['tel_celular'],
    "estudios" => $row['nombre_nestudios'],
    "nacionalidad" => $row['nombre_nac'],
    "calificacion" => $row['letra_calificacion'],
    "nombre_co" => $row['nombre_co'],
    "apellido_co" => $row['apellido_co'],
    "foto" => $row['foto']
  ));
?>
