<?php 

include_once "config.php";

$fname = mysqli_real_escape_string($db, $_POST['fname']);
$lname = mysqli_real_escape_string($db, $_POST['lname']);
$email = mysqli_real_escape_string($db, $_POST['email']);
$password = mysqli_real_escape_string($db, $_POST['password']);

// wir prüfen ,ob alles eingabe vorhanden sind!!
if(!empty($fname) && !empty($lname) && !empty($email) && !empty($password)){

    // checlk the validity of the user email 
    if(filter_var($email, FILTER_VALIDATE_EMAIL)){
        
        // we check if the email already exist 
        $sql=mysqli_query($db, "SELECT email FROM users WHERE email = '{$email}' ");
        if(mysqli_num_rows($sql) > 0){
            echo "$email - this email alreday exist!";
        }
        else
        {
            $status ="active now";
            $random_id = rand(time(), 10000000);  
              
            $sql2= $db -> query("INSERT INTO users (unique_id, fname, lname, email, password, status)
                     VALUES  ({$random_id}, '{$fname}', '{$lname}', '{$email}', '{$password}','{$status}')");
                
                     if($sql2){
                        $sql3 = mysqli_query($db, "SELECT * FROM users WHERE email='{$email}'");
         
                        if(mysqli_num_rows($sql3) > 0){
                            $row = mysqli_fetch_assoc($sql3);
                            $_SESSION['unique_id'] = $row['unique_id'];
                            echo "success";
                        }
                     }
                     else{
                           echo "Something went wrong";
                        }
        }
    }else{    
        echo " $email - This email is not a valid email!";    
        }
}
else{
    echo "All input files are required!";
    }

?>