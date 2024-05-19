import { API_BASE_URL } from './constants.mjs';

/**
 * Make an API request.
 * @param {string} endpoint - The API endpoint.
 * @param {string} method - The HTTP method.
 * @param {Object} [body] - The request body.
 * @param {string} [token] - The JWT token.
 * @returns {Promise<Object>} The response data.
 */
export async function apiRequest(endpoint, method = 'GET', body = null, token = null) {
    const apiKey = localStorage.getItem('apiKey');

    const headers = {
        'Content-Type': 'application/json',
    };

    if (apiKey) {
        headers['x-api-key'] = apiKey;
    }

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
        throw new Error(data.errors.map(error => error.message).join(', '));
    }

    return data;
}














