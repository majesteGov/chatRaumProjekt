<?php

    
session_start();
include_once 'config.php'; 

$email = $db -> real_escape_string($_POST['email']); 
$password = $db -> real_escape_string($_POST['password']);

if(!empty($email) && !empty($password)){

    if(filter_var($email, FILTER_VALIDATE_EMAIL)){

         $sql = $db -> query("SELECT * FROM users WHERE email ='{$email}' AND password ='{$password}'");
        if(mysqli_num_rows($sql) > 0){
            $row = mysqli_fetch_assoc($sql);
            $_SESSION['unique_id'] = $row['unique_id'];
            echo "success"; 
        }else{
            echo "Email or Password is incorrect !";
        }    
    }
    // echo "Wrong email format";
}else{
    echo "All input are required!\n";
}
?>