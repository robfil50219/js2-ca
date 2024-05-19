import { apiRequest } from './api.mjs';

async function fetchProfiles() {
    const token = localStorage.getItem('token');
    const apiKey = localStorage.getItem('apiKey');
    const endpoint = '/social/profiles?_following=true&_followers=true&_posts=true';
    return await apiRequest(endpoint, 'GET', null, token, apiKey);
}

export { fetchProfiles };



