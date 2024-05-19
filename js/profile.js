import { fetchProfiles } from './modules/profiles.js';

document.addEventListener('DOMContentLoaded', async () => {
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
