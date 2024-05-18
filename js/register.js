import { register } from "../modules/auth"; 

document.getElementById('registerForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const data = await register(email, password);
        alert('Registration successful!');
        window.location.href = 'login.html';
    } catch (error) {
        alert('Error: ' + error.message);
    }
});

