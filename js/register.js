document.getElementById('registerForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('https://v2.api.noroff.dev/social/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();
        if (response.ok) {
            alert('Registration successful!');
            window.location.href = 'login.html';
        } else {
            throw new Error(data.errors.map(error => error.message).join(', '));
        }
    } catch (error) {
        alert('Error: ' + error.message);
    }
});

