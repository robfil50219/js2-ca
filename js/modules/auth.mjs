import { API_BASE_URL } from './constants.mjs';
import { apiRequest } from './api.mjs';

/**
 * Register a new user and create an API key.
 * @param {Object} userDetails - The user details.
 * @returns {Promise<Object>} The registered user data.
 */
export async function register(userDetails) {
    const response = await apiRequest('/auth/register', 'POST', userDetails);

    if (response) {
        const token = response.data.accessToken;
        const apiKeyResponse = await createApiKey(token);
        if (apiKeyResponse) {
            // Store the API key in local storage or handle it as needed
            localStorage.setItem('apiKey', apiKeyResponse.data.key);
        }
    }

    return response;
}

/**
 * Create an API key.
 * @param {string} token - The JWT token.
 * @returns {Promise<Object>} The API key data.
 */
async function createApiKey(token) {
    const response = await fetch(`${API_BASE_URL}/auth/create-api-key`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ name: 'My API Key name' }), // Optional name
    });

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.errors ? data.errors[0].message : response.statusText);
    }

    return data;
}















