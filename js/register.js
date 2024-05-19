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
        ...(avatarUrl && { avatar: { url: avatarUrl } }),
        ...(bannerUrl && { banner: { url: bannerUrl } }),
    };

    try {
        await registerUser(profile);
        alert('Registration successful!'); // Inform the user about successful registration
    } catch (error) {
        console.error('Registration failed:', error);
        const errorContainer = document.getElementById('registerErrorContainer');
        const errorMessage = document.getElementById('registerError');
        errorContainer.classList.remove('hidden');
        errorMessage.textContent = `Registration failed: ${error.message}`;
    }
});



















