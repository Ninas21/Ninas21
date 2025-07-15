<!DOCTYPE html>
<html lang="fr">
<head>
	<meta charset="UTF-8"/>
	<title> DREAMZOO</title>
	<link rel="stylesheet" href="Style.css">
	<link rel="stylesheet" href="StyleGaleries.css">
	<link rel="stylesheet" href="StyleGaleries2.css">
	<link rel="stylesheet" href="StyleGaleries3.css">
	
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css">
	



	<style>
		.glisser{
			width: 300px;
			height: 450px;
			overflow: hidden;
			margin: 100px auto;
			border-radius: 50%;
		}
		.glisses{
			width: calc(300px*2);
			animation: glisse 15s infinite;
		}
		.glisse{
			float: left;
		}

        @keyframes glisse {
        	0% {
        		transform: translateX(0);
        	}
        	33% {
        		transform: translateX(-300px);
        	}
           

        	66% {
        		transform: translateX(-300px);
        	}
        	
        	100% {
        		transform: translateX(0);
        	}
        }
	</style>	
	</head>
	<body>
		<header>
			<nav>
				<ul>
					<li id="logo"><a href= "#"> DREAMZOO</a></li>
					
					<li><a href= "#reserver"><a href="Réserver.html"> Réserver</a></li>
					
				</ul>
			</nav>
			
			<div id="imagePrincipale">
				<h1> DREAMZOO</h1>
				
				<h3> "Le monde des animaux sauvages et domestiques" </h3>
			</div>
			<div id="iconsIcons">
			<div id="icons">
					<li><a href="http://www.twitter.fr"><i class="fa fa-twitter"></i></a></li>
					<li><a href="http://www.facebook.fr"><i class="fa fa-facebook"></i></a></li>
					<li><a href="http://www.instagram.fr"><i class="fa fa-instagram"></i></a></li>
					<li><a href="http://www.youtube.fr"><i class="fa fa-youtube"></i></a></li>
				</div>
				</div>
		</header>

		
			<div class="Fil">
				<ul>
					<li><a href="Actualités.html"> Fil d'actualiés</a></li>
					<li><a href="Services.html"> Nos services</a></li>
					<li><a href="Horaires.html"> Nos horaires</a></li>
					<li><a href="Tarifs.html"> Nos tarifs</a></li>
					<li><a href="Recrutement.html">  Recrutement</a></li>		
				</ul>
			</div>

		<div class ="ConIns">
				<ul>
					<li><a href="Connexion.php"> Connexion</a></li>
					<li><a href="Inscription.php"> Inscription</a></li>
				</ul>
		</div>

		<section id="partieDeuxieme">
			<div class="glisser">
				<div class="glisses">
                    <div class="glisse"> <img src="Media/Hypopotame1.jpg"alt=""/></div>
                    <div class="glisse"> <img src="Media/TIGRE3.jpg"alt="" /></div>
                    
				</div>
			</div>
			<div id="parcPresent">
				<h2> Bienvenue dans ce merveilleux monde des animaux sauvages et domestiques</h2>
				<p>Envie de faire un tour dans la jungle ou aller en afrique pour voir tous les animaux dangereux. Curieux de connaitre les espèces rares qui existent dans ce monde! Vous avez le désir de découvrir les trésors des animaux terrestres mais vous craignez le risque! Pas de panique. Nous avons pensé à vous et avons créé enfin un merveilleux parc qui partage avec vous la vie de la jungle.
				Rendez-vous donc à <strong>"DREAMZOO"</strong>.</p>
				
			</div>
			<div id="catalogue">
				<h3> Checkez votre catalogue d'images!!!</h3>
				
			</div>
			<div id="services">
				<div class="imageServ">
					
					<a href="Fichier1/Galeries.html" ><a href="Galeries.html" ><img src="Media/TigreB.jpg" alt="" height= "250 px" width="300 px"></a>
				</div>
			    <div class="imageServ">
					
					<a href="Fichier2/Galeries2.html" ><a href="Galeries2.html"><img src="Fichier2/Oiseau18.jpg" alt="Animaux domestiques" height= "250 px" width="300 px"></a>
				</div>
				<div class="imageServ">
					
					<a href="Fichier3/Galeries3.html" ><a href="Galeries3.html"><img src="Media/animalRare.jpg" alt="Animaux divers" width="300px" height="250px"></a>
				</div>
			</div>
		</section>
		<section id="jouissance">
			<h3> Et si ce monde nous était conté...?</h3>
			<ul>
				<li id="animaux"><p><a href="Disparus.html">Les animaux en voie de disparition</a></p></li>
				<li id="jungle"><p><a href="Sauvages.html"> Les animaux sauvages</a></p></li>
				<li id="foret"><p> <a href="Domestiques.html">Les animaux domestiques</a></p></li>
				<li id="tresors"><p><a href="Jungle.html"> La vie de la jungle</a></p></li>

			</ul>
		</section>
		<section id="histoire">
			<h2> L'histoire n'a pas encore fini!!</h2>
			<p> <h5>Amusez-vous bien et découvrez également nos sites restaurants et motels qui vous permettent de combler une faim et de vous reposer ou passer une nuit dans ce parc après une longue balade. Profitez-en!!!</h5></p>
			
			<ul>	
			<li id="Restaurants"><button><p> <a href="Restaurant.html">Restaurants</a></p> </button></li>
		    <li id="Motels"><button><p> <a href="Motel.html">Motels</a></p> </button></li>
			</ul>
			
		
			<p>Vous avez aimé notre parc, qu'attendez-vous alors? Venez le visiter à tout moment.</p>
			<p> Vous voulez avoir plus d'informations, n'hésitez pas à vous rendre à notre site<strong> DREAMZOO</strong> et/ou à nous contacter par mail ou par téléphone.</p>
			</section>
		
		
		<footer>
			<h2 id= "contact">Contactez-nous</h2>

			<form action= "contact.php" method="post">
				<input name= "Nom" placeholder="Nom">
				<input name="E-mail" placeholder="E-mail">
				<textarea name= "Message" placeholder="Votre message ici..."></textarea>
				<button type="submit" name= "Envoyer">Envoyer</button>	
			</form>

		<div id="telephone">
			<h4>Ou appelez-nous aux numéros suivants:</h4>
			<h4>Tél.portable: <a href="tel: 0666666667">0666666667</a></h4>
			<h4>Tél.fixe: <a href="tel: 0111111112">0111111112</a></h4>
		</div>

			<div class="Cpright" >
				<span><h5>&copy; Dreamzoo by ME NINA(); tout droit réservé; 2021</h5></span> 

			</div>
			    
		</footer>
	</body>
	
</html>
