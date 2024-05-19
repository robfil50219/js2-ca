const baseUrl = 'https://v2.api.noroff.dev';

async function apiRequest(endpoint, method = 'GET', body = null, token = null, apiKey = null) {
    const headers = {
        'Content-Type': 'application/json'
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    if (apiKey) {
        headers['x-api-key'] = apiKey;
    }

    const response = await fetch(`${baseUrl}${endpoint}`, {
        method,
        headers,
        body: body ? JSON.stringify(body) : null
    });

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.errors.map(error => error.message).join(', '));
    }

    return data;
}

export { apiRequest };






