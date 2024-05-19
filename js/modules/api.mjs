import { API_BASE_URL, API_KEY } from './constants.mjs';

export async function apiRequest(endpoint, method = 'GET', body = null, token = null) {
    const headers = {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method,
        headers,
        body: body ? JSON.stringify(body) : null,
    });

    const data = await response.json();
    if (!response.ok) {
        console.error('API Request failed:', data);
        throw new Error(data.errors ? data.errors.map(error => error.message).join(', ') : response.statusText);
    }

    return data;
}

















