import { API_BASE_URL, API_KEY } from './constants.mjs';

/**
 * Make an API request.
 * @param {string} endpoint - The API endpoint.
 * @param {string} method - The HTTP method.
 * @param {Object} [body] - The request body.
 * @param {string} [token] - The JWT token.
 * @returns {Promise<Object>} The response data.
 */
async function apiRequest(endpoint, method = 'GET', body = null, token = null) {
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
        body: body ? JSON.stringify(body) : null
    });

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.errors.map(error => error.message).join(', '));
    }

    return data;
}

export { apiRequest };












