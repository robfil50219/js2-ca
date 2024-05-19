import { register } from './modules/auth.js';

document.getElementById('registerForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const namePattern = /^[a-zA-Z0-9_]+$/;
    if (!namePattern.test(name)) {
        alert('Name can only use a-Z, 0-9, and _');
        return;
    }

    if (!email.endsWith('@stud.noroff.no')) {
        alert('Only stud.noroff.no emails are allowed to register');
        return;
    }

    try {
        const response = await register(name, email, password);
        console.log('Registration successful:', response);
        console.log('Token:', localStorage.getItem('token'));
        console.log('API Key:', localStorage.getItem('apiKey'));
        window.location.href = 'index.html'; // Redirect to login page after registration
    } catch (error) {
        console.error('Registration failed:', error);
        alert('Registration failed: ' + error.message); // Display error message
    }
});









