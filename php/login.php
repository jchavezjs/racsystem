<?php
include('connection.php');
if(isset($data_input -> user) && isset($data_input -> pass)){

  $username = $data_input -> user;
  $password = $data_input -> pass;

  $q1 = $mysqli->query("SELECT c.id_cliente AS login
                        FROM cliente c INNER JOIN users u
                        ON u.id_user = c.id_user
                        AND u.user_alias = '$username'
                        AND u.pass_user = '$password'");
  $row = $q1->fetch_assoc();

  $response = $row["login"];

  if($response){
    session_start();
    /*session is started if you don't write this line can't use $_Session  global variable*/
    $_SESSION["id"] = $response;
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
}else{
  echo json_encode(
    array(
      'status' => "No se puede conectar"
    )
  );
}
?>
