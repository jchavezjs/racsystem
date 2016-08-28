<?php
include('connection.php');
if(isset($data_input -> username) && isset($data_input -> password)){

  $username = $data_input -> username;
  $password = md5($data_input -> password);

  $q1 = $mysqli->query("SELECT login('$username','$password') AS login");
  $row = $q1->fetch_assoc();

  $response = $row["login"];

  if($response){
    session_start();
    /*session is started if you don't write this line can't use $_Session  global variable*/
    $_SESSION["id"] = $username;
    echo json_encode(
      array(
        'status' => 1
      )
    );
  }else{
    echo json_encode(
      array(
        'status' => 0
      )
    );
  }

  $mysqli->close();
}
?>
