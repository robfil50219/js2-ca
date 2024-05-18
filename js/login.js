document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('https://v2.api.noroff.dev/social/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();
        if (response.ok) {
            localStorage.setItem('token', data.data.accessToken);
            localStorage.setItem('apiKey', await createApiKey(data.data.accessToken));
            localStorage.setItem('user', JSON.stringify(data.data));
            alert('Login successful!');
            window.location.href = 'index.html';
        } else {
            throw new Error(data.errors.map(error => error.message).join(', '));
        }
    } catch (error) {
        alert('Error: ' + error.message);
    }
});

async function createApiKey(token) {
    try {
        const response = await fetch('https://v2.api.noroff.dev/social/auth/create-api-key', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json();
        if (response.ok) {
            return data.apiKey;
        } else {
            throw new Error(data.errors.map(error => error.message).join(', '));
        }
    } catch (error) {
        alert('Error creating API Key: ' + error.message);
    }
}
