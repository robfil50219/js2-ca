import { fetchProfiles } from './modules/profiles.js';

document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token');
    const apiKey = localStorage.getItem('apiKey');

    if (!token || !apiKey) {
        alert('You must be logged in to view profiles.');
        window.location.href = 'index.html'; // Redirect to login page
        return;
    }

    try {
        const profiles = await fetchProfiles();
        console.log('Profiles:', profiles);
        // Display profiles on the page
        const contentDiv = document.getElementById('content');
        profiles.data.forEach(profile => {
            const profileDiv = document.createElement('div');
            profileDiv.className = 'profile';
            profileDiv.innerHTML = `
                <h3>${profile.name}</h3>
                <p>${profile.bio}</p>
                <img src="${profile.avatar.url}" alt="${profile.avatar.alt}" class="profile-avatar">
            `;
            contentDiv.appendChild(profileDiv);
        });
    } catch (error) {
        console.error('Failed to fetch profiles:', error);
        alert('Failed to fetch profiles: ' + error.message); // Display error message
    }
});


