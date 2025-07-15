<?php
  if(isset($_POST['Envoyer']))
  {
  	if(isset($_POST['Nom']) && isset($_POST['E-mail']) && isset($_POST['Message']))
  {
  	if(!empty($_POST['Nom']) && !empty($_POST['E-mail']) && !empty($_POST['Message']))
  {
  	$name= htmlspecialchars($_POST['Nom']);
  	$email=htmlspecialchars($_POST['E-mail']);
  	$message=htmlspecialchars($_POST['Message']);

  	echo "Bonjour <strong>$name</strong> nous vous remercions pour votre message : <strong>$message</strong> . Vous aurez une réponse dans les meilleurs délais";

  }
}
}

?>
