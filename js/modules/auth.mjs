import { API_BASE_URL, API_KEY } from './constants.mjs';
import { apiRequest } from './api.mjs';

/**
 * Register a new user.
 * @param {Object} userDetails - The user details.
 * @returns {Promise<Object>} The registered user data.
 */
export async function register(userDetails) {
    const response = await apiRequest('/auth/register', 'POST', userDetails);
    return response;
}

/**
 * Login a user.
 * @param {Object} profile - The user profile.
 * @returns {Promise<void>}
 */
export async function login(profile) {
    const action = '/auth/login';
    const method = 'POST';

    const actionURL = new URL(action, API_BASE_URL);
    const loginURL = actionURL.href;
    const body = JSON.stringify(profile);

    let response;
    try {
        response = await fetch(loginURL, {
            method,
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': API_KEY,
            },
            body,
        });

        if (!response.ok) {
            const data = await response.json();
            const errContainer = document.querySelector('#loginErrorContainer');
            const errMsg = document.querySelector('#loginError');

            errContainer.classList.remove('hidden');
            errContainer.classList.add('flex');
            errMsg.textContent = data.errors ? data.errors[0].message : response.statusText;
            throw new Error(data.errors ? data.errors[0].message : response.statusText);
        }

        const data = await response.json();
        const { accessToken, ...user } = data.data;

        save('token', accessToken);

        const profileData = await getProfile(user.name);
        user.following = profileData.data.following;

        save('profile', user);

        window.location.href = 'profile.html'; // Redirect to profile page after login
    } catch (error) {
        console.error('Login failed:', error);
        throw new Error(error);
    }
}














