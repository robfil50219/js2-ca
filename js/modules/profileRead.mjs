import { apiRequest } from './api.mjs';

export async function getProfile(username) {
    return await apiRequest(`/social/profiles/${username}`, 'GET');
}
