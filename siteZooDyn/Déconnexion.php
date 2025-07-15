<?php
   session_start();
   session_destroy();
   header('Location:index.php');
   echo"Déconnexion réussie. Vous etes maintenant déconnecté(e.s).";

?>
