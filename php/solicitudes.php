<?php
include('connection.php');
session_start();
$id = $_SESSION["id"];
$query = $mysqli->query("SELECT p.nombre_producto, p.foto, m.nombre_marca, mo.nombre_modelo, s.fecha_solicitud, s.hora_solicitud, e.nombre_estsol
                        FROM productos p, marca m, modelo mo, solicitud s, estado_solic e
                        WHERE p.id_marca = m.id_marca and e.id_estsol = s.id_estsol and p.id_modelo = mo.id_modelo and s.id_cotizacion = (SELECT c.id_cotizacion from cotizacion_credito c where c.id_producto = p.id_producto limit 1) and s.id_cliente = $id");
while($res = $query->fetch_array(MYSQLI_ASSOC)){
    $solicitudes[] = array(
        "nombre" => $res["nombre_producto"],
        "foto" => $res["foto"],
        "marca" => $res["nombre_marca"],
        "modelo" => $res["nombre_modelo"],
        "fecha" => $res["fecha_solicitud"],
        "hora" => $res["hora_solicitud"],
        "estado" => $res["nombre_estsol"]
    );
}

echo json_encode(array(
    "solicitudes" => $solicitudes
));
?>