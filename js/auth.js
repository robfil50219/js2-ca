import { apiRequest } from './api.js';

async function register(email, password) {
    return await apiRequest('social/auth/register' , 'POST', { email, password }); 
}

async function login(email, password) {
    return await apiRequest('/social/auth/login', 'POST',{ email, password}); 
}

