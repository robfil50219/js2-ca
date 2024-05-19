import { login } from './modules/auth.mjs';

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        
        const formData = new FormData(loginForm);
        const email = formData.get('email');
        const password = formData.get('password');
        
        try {
            const userData = await login(email, password);
            console.log('Login successful:', userData);
            // Redirect or perform other actions upon successful login
        } catch (error) {
            console.error('Login failed:', error);
            // Handle login failure
        }
    });
});






