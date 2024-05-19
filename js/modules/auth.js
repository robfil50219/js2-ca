import { apiRequest } from './api.js';

async function login(email, password) {
    const response = await apiRequest('/auth/login', 'POST', { email, password });
    const { accessToken } = response.data;
    localStorage.setItem('token', accessToken);

    const apiKeyResponse = await apiRequest('/auth/create-api-key', 'POST', null, accessToken);
    const { key } = apiKeyResponse.data;
    localStorage.setItem('apiKey', key);

    return response;
}

async function register(name, email, password) {
    const response = await apiRequest('/auth/register', 'POST', { name, email, password });
    const { accessToken } = response.data;
    localStorage.setItem('token', accessToken);

    const apiKeyResponse = await apiRequest('/auth/create-api-key', 'POST', null, accessToken);
    const { key } = apiKeyResponse.data;
    localStorage.setItem('apiKey', key);

    return response;
}

export { login, register };



