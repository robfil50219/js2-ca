import { register as registerUser } from './modules/auth.mjs';

document.getElementById('registerForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    const name = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password');
    const avatarUrl = formData.get('avatar');
    const bannerUrl = formData.get('banner');

    const profile = {
        name,
        email,
        password,
        avatar: avatarUrl ? { url: avatarUrl } : undefined,
        banner: bannerUrl ? { url: bannerUrl } : undefined,
    };

    try {
        await registerUser(profile);
    } catch (error) {
        console.error('Registration failed:', error);
        alert('Registration failed: ' + error.message); // Display error message
    }
});















