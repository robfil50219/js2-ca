// js/modules/auth.mjs

import { API_SOCIAL_URL } from './constants.mjs';
import { save } from './storage.mjs';
import { getProfile } from './profileRead.mjs';

/**
 * Register a new user.
 * @param {Object} userDetails - The user details.
 * @returns {Promise<Object>} The registered user data.
 */
export async function register(userDetails) {
    const response = await apiRequest('/social/auth/register', 'POST', userDetails);
    return response;
}

/**
 * Login a user.
 * @param {Object} profile - The user profile.
 * @param {string} profile.email - The email of the user.
 * @param {string} profile.password - The password of the user.
 * @returns {Promise<void>}
 */
export async function login(profile) {
    const loginURL = `${API_SOCIAL_URL}/auth/login`;
    const body = JSON.stringify(profile);

    try {
        const response = await fetch(loginURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': API_KEY
            },
            body,
        });

        if (!response.ok) {
            const errorData = await response.json();
            const errContainer = document.querySelector('#loginErrorContainer');
            const errMsg = document.querySelector('#loginError');

            errContainer.classList.remove('hidden');
            errContainer.classList.add('flex');
            if (errorData) {
                errMsg.textContent = errorData.errors[0].message;
            } else {
                errMsg.textContent = error.message;
            }
            return;
        }

        const data = await response.json();
        const { accessToken, ...user } = data.data;

        save('token', accessToken);

        const profileData = await getProfile(user.name);
        user.following = profileData.data.following;

        save('profile', user);

        window.location.href = '/profile.html';
    } catch (error) {
        throw new Error(error);
    }
}









