import { apiRequest } from "./api"; 

async function fetchProfiles(page = 1, limit = 10, sort = 'name', sortOrder = 'asc') {
    const token = localStorage.getItem('token');
    const apiKey = localStorage.getItem('apiKey');
    const endpoint = `/social/profiles?page=${page}&limit=${limit}&sort=${sort}&sortOrder=${sortOrder}&_following=true&_followers=true&_posts=true`;
    return await apiRequest(endpoint, 'GET', null, token, apiKey);
}

async function viewProfile(profileName) {
    const token = localStorage.getItem('token');
    const apiKey = localStorage.getItem('apiKey');
    const endpoint = `/social/profiles/${profileName}?_following=true&_followers=true&_posts=true`;
    return await apiRequest(endpoint, 'GET', null, token, apiKey);
}

async function followProfile(profileName) {
    const token = localStorage.getItem('token');
    const apiKey = localStorage.getItem('apiKey');
    return await apiRequest(`/social/profiles/${profileName}/follow`, 'PUT', null, token, apiKey);
}

async function unfollowProfile(profileName) {
    const token = localStorage.getItem('token');
    const apiKey = localStorage.getItem('apiKey');
    return await apiRequest(`/social/profiles/${profileName}/unfollow`, 'PUT', null, token, apiKey);
}

async function editProfile(profileName, bio, banner, avatar) {
    const token = localStorage.getItem('token');
    const apiKey = localStorage.getItem('apiKey');
    return await apiRequest(`/social/profiles/${profileName}`, 'PUT', { bio, banner, avatar }, token, apiKey);
}

export { fetchProfiles, viewProfile, followProfile, unfollowProfile, editProfile };

