<!DOCTYPE html>
<html lang="fr">
<head>
	<meta charset="UTF-8"/>
	<title> Inscription </title>	
	<link rel="stylesheet" href="Inscription.css">
</head>
<body>

<h4>Inscription</h4>
<h5> Pour s'inscrire, il faut que vous saisissiez un pseudo, un email et un mot de passe. Pensez à conserver vos identifiants.  </h5>
			<form method="post">
	<input type="pseudo" name="pseudo" id="pseudo"placeholder="Votre pseudo" required><br/>
	<input type="email" name="cemail" id="cemail"placeholder="Email:exemple@exemple.com" required><br/>
	<input type="password" name="password" placeholder="Ecrire le mot de passe" required><br/>
	<input type="password" name="cpassword" id="cpassword" placeholder="Confirmer le mot de passe" required>
	<input type="submit" name="send" id="send"  value="Inscription">
            </form>

            <?php

  if(isset($_POST['send'])){
    extract($_POST);
    if(!empty($password)&& !empty($cpassword)&& !empty($cemail)&& !empty($pseudo)){
    	if($password == $cpassword){
    		$options =[
    		'cost'=> 12,
    	];
    	
    	$hashpass = password_hash($password, PASSWORD_BCRYPT, $options);
    	include 'BaseDeDonnée.php';
    	global $bd;
    	$data = $bd->prepare("INSERT INTO connecteurs(email, mot_de_passe ,pseudo) VALUES(:email,:mot_de_passe,:pseudo)");
    	$data->execute([
    		'email'=> $cemail,
    		'mot_de_passe'=> $hashpass,
    		'pseudo'=> $pseudo
        
    	]);
      $res=$data->rowCount();

      echo $res;
      if($res== 0){
            $req = $bd->prepare("INSERT INTO connecteurs(email, mot_de_passe ,pseudo) VALUES(:email,:mot_de_passe,:pseudo)");
            $req->execute([
            'email'=> $cemail,
            'mot_de_passe'=> $hashpass,
            'pseudo'=> $pseudo
        ]);
        }
               echo "Bravo! votre compte a été créé avec succès!";
            
              }else{
               echo "Ce compte existe déjà. Veuillez choisir un autre!";
              }
          }
          
     }
    

    ?>
 </body>
</html>
