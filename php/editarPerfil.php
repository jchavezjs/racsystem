<?php
include('connection.php');
session_start();
$id = $_SESSION["id"];
$tipo = $_GET["tipo"];
if($tipo == "img"){
  $filename = $_FILES['file']['name'];
  $filename = preg_replace('/\s+/', '', $filename);
  $destination = '../img/'.$filename;
  move_uploaded_file( $_FILES['file']['tmp_name'],$destination);
}else{
  $email = $data_input -> email;
  $sexo = $data_input -> sexo;
  $fecha = new DateTime($data_input -> fecha);
  $nfecha = $fecha->format('Y-m-d');
  $trabajo = $data_input -> trabajo;
  $vivienda = $data_input -> vivienda;
  $cargo = $data_input -> cargo;
  $telefono = $data_input -> telefono;
  $estado = $data_input -> estado;
  $nacionalidad = $data_input -> nacionalidad;
  $estudio = $data_input -> estudio;
  $ingreso = $data_input -> ingreso;
  $foto = $data_input -> foto;
  $mysqli->query("pdate cliente set email=".mysqli_real_escape_string($enlace,'$email').", fecha_nacimiento='$nfecha', id_sexo=$sexo, lugar_trabajo='$trabajo', id_tipo_vivienda=$vivienda, foto='$foto', id_estado_civil=$estado, money_income=$ingreso, id_nacionalidad=$nacionalidad, id_nivel_estudios=$estudio where id_cliente=$id");
}
?>
