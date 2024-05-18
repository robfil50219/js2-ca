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
