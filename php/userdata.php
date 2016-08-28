<?php
include('connection.php');
/* Session Info*/
session_start();
/* Session Info*/

if(isset($_SESSION["id"])){
  echo json_encode(
    array(
      'status' => "good"
    )
  );
}else{
  echo json_encode(
    array(
      'status' =>  null,
    )
  );
}
?>
