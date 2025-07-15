<!DOCTYPE html>
<html lang="fr">
<head>
	<meta charset="UTF-8"/>
	<title> Connexion </title>	
	<link rel="stylesheet" href="Connexion.css">
</head>
<body>


<h4>Connexion</h4>
<h5> Veuillez saisir vos identifiants: email, pseudo et mot de passe pour vous connecter.</h5>
			<form method="post">
  <input type="text" name="pseudo" id="pseudo" placeholder="Tapez votre pseudo ici">
	<input type="email" name="memail" id="memail" placeholder="Email:exemple@exemple.com">
	<input type="password" name="mpassword" id="mpassword"  placeholder="Entrez votre mot de passe">
	<input type="submit" name="connect" id="connect" value="Connexion">
      </form>

            <?php 
         if(isset($_POST['connect']))
         {
         	extract($_POST);
         	if(!empty($memail) && !empty($mpassword) && !empty($pseudo))
         	{
           
            include 'BaseDeDonnée.php';
            global $bd;

         		$data= $bd->prepare("SELECT * FROM connecteurs WHERE email =:email");
         		$data->execute([
              'email'=>$memail
                  ]);

         	    $res= $data->fetch();	
              if($res==true)
              {
                $hashpass= $res['mot_de_passe'];
                if(password_verify($mpassword,$hashpass))

                {

                   
                  echo "Le mot de passe est bon. Préparation de la connexion..."; 
                  echo 'Le compte est bon.';
               header ('Location:MonEspace.php');

                }else{
                  echo "Le mot de passe que vous avez saisi est erroné.";
              
                  echo "Les identifiants : "  . $memail . " ou " . $pseudo . " ou mot de passe ne sont pas corrects.";
            

          }
          
         
        }
      }
    }
  ?>

  </body>
</html>
 
