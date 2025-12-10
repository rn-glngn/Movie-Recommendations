<?php
$servername = "localhost";
$username   = "root";  // change if needed
$password   = "";
$dbname     = "movie_matabase";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn){
    echo"You are connected";
}
else{
    echo"You are not connected";
}
?>
