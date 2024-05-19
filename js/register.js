import { API_SOCIAL_URL } from './modules/constants.mjs';
import { register, login } from './modules/auth.mjs';

document.getElementById('registerForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    
    const name = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password');
    const avatar = formData.get('avatar');
    const banner = formData.get('banner');

    const profile = {
        name,
        email,
        password,
        avatar,
        banner
    };

    const action = '/auth/register';
    const method = 'POST';

    try {
        await register(profile, action, method);
    } catch (error) {
        console.error('Registration failed:', error);
        alert('Registration failed: ' + error.message); // Display error message
    }
});

export async function register(profile, action, method) {
    const actionURL = new URL(action, API_SOCIAL_URL);
    const registrationURL = actionURL.href;
    const body = JSON.stringify(profile);

    try {
        const response = await fetch(registrationURL, {
            method,
            headers: {
                "Content-Type": "application/json",
            },
            body,
        });

        if (!response.ok) {
            const errorData = await response.json();
            const errContainer = document.querySelector(`#registerErrorContainer`);
            const errMsg = document.querySelector(`#registerError`);

            errContainer.classList.remove("hidden");
            errContainer.classList.add("flex");
            if (errorData) {
                errMsg.textContent = errorData.errors[0].message;
            } else {
                errMsg.textContent = error.message;
            }
        } else if (response.ok) {
            const loginProfile = {
                email: profile.email,
                password: profile.password,
            };
            const loginAction = `${API_SOCIAL_URL}/auth/login`;
            const loginMethod = 'POST';
            login(loginProfile, loginAction, loginMethod);
        }
    } catch (error) {
        throw new Error(error);
    }
}










