<?php
session_start();
header('Content-Type: application/json');
require_once '../../config/db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get and sanitize form data
    $email = trim(htmlspecialchars($_POST['email']));
    $password = $_POST['password'];
    
    // Validation
    if(empty($email) || empty($password)) {
        echo json_encode([
            'success' => false, 
            'message' => 'All fields are required'
        ]);
        exit();
    }
    
    try {
        $database = new Database();
        $conn = $database->getConnection();
        
        // Find user by email
        $stmt = $conn->prepare("SELECT * FROM users WHERE email = :email");
        $stmt->bindParam(':email', $email);
        $stmt->execute();
        
        if($stmt->rowCount() > 0) {
            $user = $stmt->fetch(PDO::FETCH_ASSOC);
            
            // Verify password
            if(password_verify($password, $user['password'])) {
                // Set session variables
                $_SESSION['user_id'] = $user['user_id'];
                $_SESSION['username'] = $user['username'];
                $_SESSION['fullname'] = $user['fullname'];
                $_SESSION['email'] = $user['email'];
                $_SESSION['role'] = $user['role'];
                
                // Check if admin or regular user
                if($user['role'] === 'admin') {
                    echo json_encode([
                        'success' => true, 
                        'message' => 'Login successful!',
                        'redirect' => '../admin/dashboard.html'
                    ]);
                } else {
                    echo json_encode([
                        'success' => true, 
                        'message' => 'Login successful!',
                        'redirect' => '../pages/index.html'
                    ]);
                }
            } else {
                echo json_encode([
                    'success' => false, 
                    'message' => 'Invalid email or password'
                ]);
            }
        } else {
            echo json_encode([
                'success' => false, 
                'message' => 'Invalid email or password'
            ]);
        }
    } catch(Exception $e) {
        echo json_encode([
            'success' => false, 
            'message' => 'Error: ' . $e->getMessage()
        ]);
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" href="../assets/logo/FilmoPicks Large Logo (Dark).svg" type="image/svg+xml">
    <link rel="stylesheet" href="../assets/styles/globals.css">
    <link rel="stylesheet" href="../assets/styles/login.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <script src="../assets/scripts/login.js" defer></script>
    <title>Login - FilmoPicks</title>
</head>
<body>
    <div class="login-container">
        <div class="logo-container">
            <img src="../assets/logo/FilmoPicks Large Logo (Dark).svg" alt="FilmoPicks Logo">
        </div>
        <h1 class="login-title">Welcome Back!</h1>
        <p class="login-subtitle">Log in to continue your movie journey</p>
        
        <!-- Success/Error Message -->
        <div id="message" style="display:none; padding:10px; margin:10px 0; border-radius:5px;"></div>
        
        <form id="loginForm" method="POST">
            <div class="form-group">
                <label for="email" class="form-label">Email Address</label>
                <input type="email" id="email" name="email" class="form-input" placeholder="Enter your email" required>
            </div>

            <div class="form-group password-wrapper">
                <label for="password" class="form-label">Password</label>
                <div class="input-with-icon">
                    <input type="password" id="password" name="password" class="form-input" placeholder="Create a password" required minlength="8">
                    <i class="fa-solid fa-eye-slash toggle-icon" id="togglePassword" style="display: none;"></i>
                </div>
            </div>

            <div class="forgot-password">
                <a href="reset-password.html">Forgot Password?</a>
            </div>
            <button type="submit" class="btn-login">Log In</button>
        </form>
    
        <div class="signup-link">
            Don't have an account? <a href="signup.html">Sign Up</a>
        </div>
        <div class="back-home">
            <a href="index.html">← Back to Home</a>
        </div>
    </div>

    <script>

        
    </script>
</body>
</html>
