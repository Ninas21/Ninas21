<?php
   session_start(); 
   include 'BaseDeDonnée.php';
   if(isset($_POST['connect']))
      header('Location:Connexion.php');
?>
<!DOCTYPE html>
<html lang="fr">
<head>
	<meta charset="UTF-8"/>
	<title> Mon espace DREAMZOO </title>	
	<link rel="stylesheet" href="MonEspace.css">
</head>


<body>

<header>

		<li id="logo"><a href= "#"> DREAMZOO</a></li>			
		<div class="decon">
		<a href="Déconnexion.php">Déconnexion</a>
		</div>
</header>

<h2>BIENVENUE dans votre page personnelle <strong>"DREAMZOO"</strong></h2>
<h3>Bonjour</h3>

<div class="tout">
		<a href="#"  > Vos réservations</a>
		<a href="#"  > Vos points fidèlités</a>
		<a href="#"  > Informations personnelles</a>
		
		</div>

 
  </body>
  </html>
