<?php include '../config/db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get and sanitize form data
    $fullname = trim(htmlspecialchars($_POST['fullname']));
    $username = trim(htmlspecialchars($_POST['username']));
    $email = trim(htmlspecialchars($_POST['email']));
    $password = $_POST['password'];
    $confirmPassword = $_POST['confirm-password'];

    // Validation
    if (empty($fullname) || empty($username) || empty($email) || empty($password)) {
        echo json_encode([
            'success' => false,
            'message' => 'All fields are required'
        ]);
        exit();
    }

    // Validate email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode([
            'success' => false,
            'message' => 'Invalid email address'
        ]);
        exit();
    }

    if (strlen($password) < 8) {
        echo json_encode([
            'success' => false,
            'message' => 'Password must be at least 8 characters'
        ]);
        exit();
    }

    if ($password !== $confirmPassword) {
        echo json_encode([
            'success' => false,
            'message' => 'Passwords do not match'
        ]);
        exit();
    }

    try {
        // Check if email or username exists
        $stmt = $conn->prepare("SELECT user_id FROM users WHERE email = :email OR username = :username");
        $stmt->bind_param(':email', $email);
        $stmt->bind_param(':username', $username);
        $stmt->execute();

        if ($stmt->num_rows > 0) {
            echo json_encode([
                'success' => false,
                'message' => 'Email or username already exists'
            ]);
            exit();
        }

        // Hash password
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

        // Insert user
        $stmt = $conn->prepare("
            INSERT INTO users (fullname, username, email, password, role) 
            VALUES (:fullname, :username, :email, :password, 'user')
        ");
        $stmt->bind_param(':fullname', $fullname);
        $stmt->bind_param(':username', $username);
        $stmt->bind_param(':email', $email);
        $stmt->bind_param(':password', $hashedPassword);

        if ($stmt->execute()) {
            echo json_encode([
                'success' => true,
                'message' => 'Account created successfully!'
            ]);
        } else {
            echo json_encode([
                'success' => false,
                'message' => 'Registration failed. Please try again.'
            ]);
        }
    } catch (Exception $e) {
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
    <link rel="icon" href="../../assets/logo/FilmoPicks Large Logo (Dark).svg" type="image/svg+xml">
    <link rel="stylesheet" href="../../assets/styles/globals.css">
    <link rel="stylesheet" href="../../assets/styles/signup.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css">
    <script src="../../assets/scripts/signup.js" defer></script>
    <title>Sign Up - FilmoPicks</title>
</head>

<body>
    <div class="signup-container">
        <div class="logo-container">
            <img src="../../assets/logo/FilmoPicks Large Logo (Dark).svg" alt="FilmoPicks Logo">
        </div>

        <h1 class="signup-title">Create Account</h1>
        <p class="signup-subtitle">Join FilmoPicks and discover amazing content</p>

        <!-- Success/Error Message -->
        <div id="message" style="display:none; padding:10px; margin:10px 0; border-radius:5px;"></div>

        <form action="signup.php" method="POST" id="signupForm">
            <div class="form-group">
                <label for="fullname" class="form-label">Full Name</label>
                <input type="text" id="fullname" name="fullname" class="form-input" placeholder="Enter your full name"
                    required>
            </div>

            <div class="form-group">
                <label for="username" class="form-label">Username</label>
                <input type="text" id="username" name="username" class="form-input"
                    placeholder="Enter your username" required>
            </div>

            <div class="form-group">
                <label for="email" class="form-label">Email Address</label>
                <input type="email" id="email" name="email" class="form-input" placeholder="Enter your email" required>
            </div>

            <div class="form-group">
                <label for="password" class="form-label">Password</label>
                <div class="input-with-icon">
                    <input type="password" id="password" name="password" class="form-input" placeholder="Create a password" required minlength="8">
                    <i class="fa-solid fa-eye-slash toggle-icon" id="togglePassword" style="display: none;"></i>
                </div>
            </div>

            <div class="form-group">
                <label for="confirm-password" class="form-label">Confirm Password</label>
                <div class="input-with-icon">
                    <input type="password" id="confirm-password" name="confirm-password" class="form-input" placeholder="Confirm your password" required>
                    <i class="fa-solid fa-eye-slash toggle-icon" id="toggleConfirm" style="display: none;"></i>
                </div>
            </div>

            <div class="terms-checkbox">
                <input type="checkbox" id="terms" name="terms" required>
                <label for="terms">
                    I agree to the Terms of Service and Privacy Policy
                </label>
            </div>

            <button type="submit" class="btn-signup">Create Account</button>
        </form>


        <div class="login-link">
            Already have an account? <a href="login.php">Log In</a>
        </div>

        <div class="back-home">
            <a href="index.php">← Back to Home</a>
        </div>
    </div>
</body>

</html>