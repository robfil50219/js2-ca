import { apiRequest } from './api.js';

async function register(email, password) {
    return await apiRequest('social/auth/register' , 'POST', { email, password }); 
}

async function login(email, password) {
    return await apiRequest('/social/auth/login', 'POST',{ email, password}); 
}

async function createApiKey(token) {
    const response = await apiRequest('/social/auth/create-api-key', 'POST', null, token);
}

