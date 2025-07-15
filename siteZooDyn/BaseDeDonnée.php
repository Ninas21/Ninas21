<?php
    
    define('HOST','localhost');
    define('DB_NAME', 'moncompte');
    define('USER', 'root');
    define('PASS', '');

    try{
    	$bd= new PDO("mysql:host=" .HOST .";dbname=" .DB_NAME, USER, PASS);
    	$bd-> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
       
    }catch(PDOException $erreur){
    	echo $erreur;

    }
?>
