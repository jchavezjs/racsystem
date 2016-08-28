<?php
include('connection.php');
session_start();

unset($_SESSION["id"]);

mysqli_close($enlace);
?>
