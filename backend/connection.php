<?php
$servername = "localhost";
$username   = "root";  
$password   = "";
$dbname     = "filmopicks_db"; // database name

try{
    $conn = new mysqli($servername, $username, $password, $dbname);
}
catch(mysqli_sql_exception $e){
    // Connection failed - handle silently or log error
    error_log("Database connection failed: " . $e->getMessage());
}

?>
