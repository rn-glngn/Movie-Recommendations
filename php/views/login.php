<?php include '../config/db.php';
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  // Get and sanitize form data
  $email = trim($_POST['email'] ?? '');
  $password = $_POST['password'] ?? '';

  // Validation
  if (empty($email) || empty($password)) {
    echo json_encode([
      'success' => false,
      'message' => 'All fields are required'
    ]);
    exit();
  }

  // Validate email format
  if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode([
      'success' => false,
      'message' => 'Invalid email format'
    ]);
    exit();
  }

  // Find user by email using MySQLi
  $stmt = $conn->prepare("SELECT user_id, username, fullname, email, password, role FROM users WHERE email = ?");

  if (!$stmt) {
    error_log("Prepare failed: " . $conn->error);
    echo json_encode([
      'success' => false,
      'message' => 'Database error'
    ]);
    exit();
  }

  $stmt->bind_param("s", $email);
  $stmt->execute();

  // Store result to check num_rows
  $stmt->store_result();

  // Check if user exists
  if ($stmt->num_rows > 0) {
    // Initialize and Bind result variables
    $hashed_password = '';
    $stmt->bind_result($user_id, $username, $fullname, $user_email, $hashed_password, $role);

    // Fetch the result
    $stmt->fetch();
    $stmt->close();

    // Verify password
    if (password_verify($password, $hashed_password)) {
      // Regenerate session ID for security
      session_regenerate_id(true);

      // Set session variables
      $_SESSION['user_id'] = $user_id;
      $_SESSION['username'] = $username;
      $_SESSION['fullname'] = $fullname;
      $_SESSION['email'] = $user_email;
      $_SESSION['role'] = $role;


      // Check if admin or regular user
      if ($role === 'admin') {
        echo json_encode([
          'success' => true,
          'message' => 'Login successful!',
          'redirect' => '../views/admin/dashboard.php'
        ]);
      } else {
        echo json_encode([
          'success' => true,
          'message' => 'Login successful!',
          'redirect' => '../views/index.php'
        ]);
      }
    } else {
      echo json_encode([
        'success' => false,
        'message' => 'Invalid email or password'
      ]);
    }
  } else {
    $stmt->close();
    echo json_encode([
      'success' => false,
      'message' => 'Invalid email or password'
    ]);
  }

  exit();
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="icon" href="../../assets/logo/FilmoPicks Large Logo (Dark).svg" type="image/svg+xml">
  <link rel="stylesheet" href="../../assets/styles/globals.css">
  <link rel="stylesheet" href="../../assets/styles/login.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css">
  <script src="../../assets/scripts/login.js" defer></script>
  <title>Login - FilmoPicks</title>
</head>

<body>
  <div class="login-container">
    <div class="logo-container">
      <img src="../../assets/logo/FilmoPicks Large Logo (Dark).svg" alt="FilmoPicks Logo">
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
          <input type="password" id="password" name="password" class="form-input" placeholder="Enter your password" required minlength="8">
          <i class="fa-solid fa-eye-slash toggle-icon" id="togglePassword" style="display: none;"></i>
        </div>
      </div>

      <div class="forgot-password">
        <a href="reset-password.html">Forgot Password?</a>
      </div>
      <button type="submit" class="btn-login">Log In</button>
    </form>

    <div class="signup-link">
      Don't have an account? <a href="signup.php">Sign Up</a>
    </div>
    <div class="back-home">
      <a href="index.php">← Back to Home</a>
    </div>
  </div>
</body>

</html>