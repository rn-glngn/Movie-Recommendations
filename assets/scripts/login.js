const passwordInput = document.getElementById('password');
const togglePassword = document.getElementById('togglePassword');

// Show icon only when typing
passwordInput.addEventListener('input', function () {
    togglePassword.style.display = this.value.length > 0 ? 'block' : 'none';
});

// Toggle visibility
togglePassword.addEventListener('click', function () {
    const isHidden = passwordInput.type === 'password';
    passwordInput.type = isHidden ? 'text' : 'password';

    // Switch icon
    this.classList.toggle('fa-eye');
    this.classList.toggle('fa-eye-slash');
});

const loginForm = document.getElementById('loginForm');
const messageDiv = document.getElementById('message');

loginForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    // Get form data
    const formData = new FormData(this);

    try {
        // Send data to PHP
        const response = await fetch('../api/auth/login.php', {
            method: 'POST',
            body: formData
        });

        const result = await response.json();

        // Show message
        messageDiv.style.display = 'block';
        messageDiv.textContent = result.message;

        if (result.success) {
            messageDiv.style.backgroundColor = '#d4edda';
            messageDiv.style.color = '#155724';
            messageDiv.style.border = '1px solid #c3e6cb';

            // Redirect after 1 second
            setTimeout(() => {
                window.location.href = '../index.html'; // if index.html is in FILMOPICKS/
            }, 1000);
        } else {
            messageDiv.style.backgroundColor = '#f8d7da';
            messageDiv.style.color = '#721c24';
            messageDiv.style.border = '1px solid #f5c6cb';
        }
    } catch (error) {
        messageDiv.style.display = 'block';
        messageDiv.style.backgroundColor = '#f8d7da';
        messageDiv.style.color = '#721c24';
        messageDiv.textContent = 'An error occurred. Please try again.';
        console.error('Error:', error);
    }
});