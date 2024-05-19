import { login } from './modules/auth.js';

document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await login(email, password);
        console.log('Login successful:', response);
        window.location.href = 'home.html'; // Redirect to home page after login
    } catch (error) {
        console.error('Login failed:', error);
        alert('Login failed: ' + error.message); // Display error message
    }
});


