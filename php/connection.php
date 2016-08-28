<?php
define('db_name','racsystem');
define('db_username','root');
define('db_password','');
define('db_host','127.0.0.1');

$enlace = mysqli_connect(db_host, db_username, db_password, db_name);
/* mysqli for querys */
$mysqli = new mysqli(db_host, db_username, db_password, db_name);
/* mysqli for querys */

if (!$enlace) {
    echo "Error: No se pudo conectar a MySQL." . PHP_EOL;
    echo "error de depuración: " . mysqli_connect_errno() . PHP_EOL;
    echo "error de depuración: " . mysqli_connect_error() . PHP_EOL;
    exit;
}

$con_status = "Running </br> Host information: " . mysqli_get_host_info($enlace) . PHP_EOL;

$data_input = json_decode(file_get_contents("php://input"));
date_default_timezone_set('America/El_Salvador');

// mysqli_close($enlace);
?>
