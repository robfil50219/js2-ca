import { login, createApiKey } from "./modules/auth"; 

document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const data = await login(email, password);
        localStorage.setItem('token', data.data.accessToken);
        localStorage.setItem('apiKey', await createApiKey(data.data.accessToken));
        localStorage.setItem('user', JSON.stringify(data.data));
        alert('Login successful!');
        window.location.href = 'index.html';
    } catch (error) {
        alert('Error: ' + error.message);
    }
});
