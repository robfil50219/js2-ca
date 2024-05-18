async function fetchProfiles(page = 1, limit = 10, sort = 'name', sortOrder = 'asc') {
    const token = localStorage.getItem('token');
    const apiKey = localStorage.getItem('apiKey');
    const url = new URL('https://v2.api.noroff.dev/social/profiles');
    
    url.searchParams.append('page', page);
    url.searchParams.append('limit', limit);
    url.searchParams.append('sort', sort);
    url.searchParams.append('sortOrder', sortOrder);
    url.searchParams.append('_following', true);
    url.searchParams.append('_followers', true);
    url.searchParams.append('_posts', true);

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                'x-api-key': apiKey
            }
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.errors.map(error => error.message).join(', '));
        }

        displayProfiles(data.data);
        updatePaginationControls(page, limit, data.meta.totalCount);
    } catch (error) {
        alert('Error fetching profiles: ' + error.message);
    }
}

function displayProfiles(profiles) {
    const content = document.getElementById('content');
    content.innerHTML = ''; // Clear previous profiles
    profiles.forEach(profile => {
        const profileElement = document.createElement('div');
        profileElement.classList.add('profile');
        profileElement.innerHTML = `
            <h2>${profile.name}</h2>
            <img src="${profile.avatar.url}" alt="${profile.avatar.alt}" class="profile-avatar">
            <p>${profile.bio}</p>
            <button onclick="viewProfile('${profile.name}')">View Profile</button>
            <button onclick="followProfile('${profile.name}')">Follow</button>
            <button onclick="unfollowProfile('${profile.name}')">Unfollow</button>
        `;
        content.appendChild(profileElement);
    });
}

function updatePaginationControls(currentPage, limit, totalCount) {
    const paginationControls = document.getElementById('paginationControls');
    const totalPages = Math.ceil(totalCount / limit);
    paginationControls.innerHTML = `
        <button onclick="fetchProfiles(${currentPage - 1}, ${limit})" ${currentPage === 1 ? 'disabled' : ''}>Previous</button>
        <span>Page ${currentPage} of ${totalPages}</span>
        <button onclick="fetchProfiles(${currentPage + 1}, ${limit})" ${currentPage === totalPages ? 'disabled' : ''}>Next</button>
    `;
}

async function viewProfile(profileName) {
    const token = localStorage.getItem('token');
    const apiKey = localStorage.getItem('apiKey');
    const url = `https://v2.api.noroff.dev/social/profiles/${profileName}?_following=true&_followers=true&_posts=true`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                'x-api-key': apiKey
            }
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.errors.map(error => error.message).join(', '));
        }

        displayProfile(data.data);
    } catch (error) {
        alert('Error viewing profile: ' + error.message);
    }
}

function displayProfile(profile) {
    const content = document.getElementById('content');
    content.innerHTML = `
        <h2>${profile.name}</h2>
        <img src="${profile.avatar.url}" alt="${profile.avatar.alt}" class="profile-avatar">
        <p>${profile.bio}</p>
        <img src="${profile.banner.url}" alt="${profile.banner.alt}" class="profile-banner">
        <h3>Followers</h3>
        ${profile.followers.map(follower => `<div>${follower.name}</div>`).join('')}
        <h3>Following</h3>
        ${profile.following.map(following => `<div>${following.name}</div>`).join('')}
        <h3>Posts</h3>
        ${profile.posts.map(post => `<div>${post.title}</div>`).join('')}
        <button onclick="followProfile('${profile.name}')">Follow</button>
        <button onclick="unfollowProfile('${profile.name}')">Unfollow</button>
        <button onclick="editProfile('${profile.name}')">Edit Profile</button>
    `;
}

async function followProfile(profileName) {
    const token = localStorage.getItem('token');
    const apiKey = localStorage.getItem('apiKey');
    try {
        const response = await fetch(`https://v2.api.noroff.dev/social/profiles/${profileName}/follow`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                'x-api-key': apiKey
            }
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.errors.map(error => error.message).join(', '));
        }
        alert('Followed successfully!');
        fetchProfiles();
    } catch (error) {
        alert('Error following profile: ' + error.message);
    }
}

async function unfollowProfile(profileName) {
    const token = localStorage.getItem('token');
    const apiKey = localStorage.getItem('apiKey');
    try {
        const response = await fetch(`https://v2.api.noroff.dev/social/profiles/${profileName}/unfollow`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                'x-api-key': apiKey
            }
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.errors.map(error => error.message).join(', '));
        }
        alert('Unfollowed successfully!');
        fetchProfiles();
    } catch (error) {
        alert('Error unfollowing profile: ' + error.message);
    }
}

async function editProfile(profileName) {
    const token = localStorage.getItem('token');
    const apiKey = localStorage.getItem('apiKey');
    const bio = prompt('Enter new bio:');
    const bannerUrl = prompt('Enter new banner URL:');
    const bannerAlt = prompt('Enter banner alt text:');
    const avatarUrl = prompt('Enter new avatar URL:');
    const avatarAlt = prompt('Enter avatar alt text:');

    try {
        const response = await fetch(`https://v2.api.noroff.dev/social/profiles/${profileName}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                'x-api-key': apiKey
            },
            body: JSON.stringify({
                bio,
                banner: { url: bannerUrl, alt: bannerAlt },
                avatar: { url: avatarUrl, alt: avatarAlt }
            })
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.errors.map(error => error.message).join(', '));
        }
        alert('Profile updated successfully!');
        viewProfile(profileName); // Refresh the profile view
    } catch (error) {
        alert('Error updating profile: ' + error.message);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    fetchProfiles();
});

