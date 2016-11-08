<?php
  include('connection.php');
  session_start();
  $id = $_SESSION["id"];

  $query = $mysqli->query("SELECT c.primer_apellido, c.segundo_apellido, c.primer_nombre, c.id_tipo_vivienda, c.segundo_nombre, c.fecha_nacimiento,
                          c.money_income, c.email, c.lugar_trabajo, c.id_sexo, c.id_estado_civil, p.name_cargo, t.tel_celular, e.id_nivel_estudios,
                          n.id_nacionalidad, ca.letra_calificacion, co.primer_nombre as nombre_co, co.primer_apellido as apellido_co, c.foto
                          FROM cliente c, telefono t, nivel_estudios e, nacionalidad n, calificacion ca, conyuge_clien co, position p
                          WHERE c.id_telefono = t.id_telefono and c.id_nivel_estudios = e.id_nivel_estudios and c.id_nacionalidad = n.id_nacionalidad
                          and c.id_calificacion = ca.id_calificacion and c.id_conyugecli = co.id_conyuge_cli and c.id_cargo = p.id_cargo and c.id_cliente = $id");

 $estadosc = $mysqli->query("SELECT id_estado_civil, nombre_est_civ from estado_civil");

 $estudio = $mysqli->query("SELECT id_nivel_estudios, nombre_nestudios from nivel_estudios");

 $nacionalidad = $mysqli->query("SELECT id_nacionalidad, nombre_nac from nacionalidad");
  
 $vivienda = $mysqli->query("SELECT id_tipo_vivienda, nombre_tvivienda from tipo_vivienda");

 while($res1 = $estadosc->fetch_array(MYSQLI_ASSOC)){
   $estados[] = array(
     "id" => $res1["id_estado_civil"],
     "nombre" => $res1["nombre_est_civ"]
   );
 }

  while($res2 = $estudio->fetch_array(MYSQLI_ASSOC)){
   $estudios[] = array(
     "id" => $res2["id_nivel_estudios"],
     "nombre" => $res2["nombre_nestudios"]
   );
 }

 while($res3 = $nacionalidad->fetch_array(MYSQLI_ASSOC)){
   $nacionalidades[] = array(
     "id" => $res3["id_nacionalidad"],
     "nombre" => $res3["nombre_nac"]
   );
 }

 while($res4 = $vivienda->fetch_array(MYSQLI_ASSOC)){
   $viviendas[] = array(
     "id" => $res4["id_tipo_vivienda"],
     "nombre" => $res4["nombre_tvivienda"]
   );
 }

  $row = $query->fetch_assoc();

  $perfil = array(
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
    "estudios" => $row['id_nivel_estudios'],
    "vivienda" => $row['id_tipo_vivienda'],
    "nacionalidad" => $row['id_nacionalidad'],
    "calificacion" => $row['letra_calificacion'],
    "nombre_co" => $row['nombre_co'],
    "apellido_co" => $row['apellido_co'],
    "foto" => $row['foto']
  );


  echo json_encode(array(
    "perfil" => $perfil,
    "estados" => $estados,
    "estudios" => $estudios,
    "nacionalidades" => $nacionalidades,
    "viviendas" => $viviendas
  ));
?>
