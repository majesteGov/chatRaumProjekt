<?php

	$dbhost = "localhost";
	$dbuser = "root";
	$dbpass = "";
	$dbname = "sign_in";
	
	$db = mysqli_connect($dbhost, $dbuser, $dbpass, $dbname);
	if(!$db){
		die("Connection failed" .mysqli_connect_error());
	}
	// echo "Connected succesfully\n";

?>