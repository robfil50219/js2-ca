import { login } from './modules/auth.mjs';

document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const email = formData.get('email');
    const password = formData.get('password');

    const profile = {
        email,
        password,
    };

    try {
        await login(profile);
    } catch (error) {
        console.error('Login failed:', error);
        alert('Login failed: ' + error.message); // Display error message
    }
});




