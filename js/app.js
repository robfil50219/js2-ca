async function fetchPosts(page = 1, limit = 10, sort = 'created', sortOrder = 'desc', tag = '') {
    const token = localStorage.getItem('token');
    const apiKey = localStorage.getItem('apiKey');
    const url = new URL('https://v2.api.noroff.dev/social/posts');
    
    url.searchParams.append('page', page);
    url.searchParams.append('limit', limit);
    url.searchParams.append('sort', sort);
    url.searchParams.append('sortOrder', sortOrder);
    if (tag) {
        url.searchParams.append('_tag', tag);
    }
    url.searchParams.append('_author', true);
    url.searchParams.append('_comments', true);
    url.searchParams.append('_reactions', true);

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

        displayPosts(data.data);
        updatePaginationControls(page, limit, data.meta.totalCount);
    } catch (error) {
        alert('Error fetching posts: ' + error.message);
    }
}

function displayPosts(posts) {
    const content = document.getElementById('content');
    content.innerHTML = ''; // Clear previous posts
    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('post');
        postElement.innerHTML = `
            <h2>${post.title}</h2>
            <p>${post.body}</p>
            <img src="${post.media.url}" alt="${post.media.alt}" class="post-image">
            <div>Tags: ${post.tags.join(', ')}</div>
            <div>Author: ${post.author.name}</div>
            <div>Comments: ${post._count.comments} | Reactions: ${post._count.reactions}</div>
            <button onclick="editPost('${post.id}')">Edit</button>
            <button onclick="deletePost('${post.id}')">Delete</button>
            <button onclick="addReaction('${post.id}', '👍')">👍</button>
            <button onclick="addReaction('${post.id}', '❤️')">❤️</button>
            <div>
                <input type="text" id="comment-${post.id}" placeholder="Add a comment">
                <button onclick="addComment('${post.id}')">Comment</button>
            </div>
        `;
        content.appendChild(postElement);
    });
}

function updatePaginationControls(currentPage, limit, totalCount) {
    const paginationControls = document.getElementById('paginationControls');
    const totalPages = Math.ceil(totalCount / limit);
    paginationControls.innerHTML = `
        <button onclick="fetchPosts(${currentPage - 1}, ${limit})" ${currentPage === 1 ? 'disabled' : ''}>Previous</button>
        <span>Page ${currentPage} of ${totalPages}</span>
        <button onclick="fetchPosts(${currentPage + 1}, ${limit})" ${currentPage === totalPages ? 'disabled' : ''}>Next</button>
    `;
}

function applySorting() {
    const sort = document.getElementById('sort').value;
    const sortOrder = document.getElementById('sortOrder').value;
    fetchPosts(1, 10, sort, sortOrder); // Reset to the first page when sorting changes
}

function applyFiltering() {
    const tag = document.getElementById('tagFilter').value;
    fetchPosts(1, 10, 'created', 'desc', tag); // Reset to the first page when filtering
}

document.addEventListener('DOMContentLoaded', () => {
    fetchPosts();
});

async function createPost() {
    const token = localStorage.getItem('token');
    const apiKey = localStorage.getItem('apiKey');
    const title = prompt('Enter post title:');
    const body = prompt('Enter post body:');
    const tags = prompt('Enter tags, separated by commas:').split(',');
    const mediaUrl = prompt('Enter image URL:');
    const mediaAlt = prompt('Enter image alt text:');

    try {
        const response = await fetch('https://v2.api.noroff.dev/social/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                'x-api-key': apiKey
            },
            body: JSON.stringify({ title, body, tags, media: { url: mediaUrl, alt: mediaAlt } })
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.errors.map(error => error.message).join(', '));
        }
        alert('Post created successfully!');
        fetchPosts(); // Refresh the posts to show the new post
    } catch (error) {
        alert('Error creating post: ' + error.message);
    }
}

async function editPost(postId) {
    const token = localStorage.getItem('token');
    const apiKey = localStorage.getItem('apiKey');
    const title = prompt('Enter new title:');
    const body = prompt('Enter new body:');
    const tags = prompt('Enter new tags, separated by commas:').split(',');
    const mediaUrl = prompt('Enter new image URL:');
    const mediaAlt = prompt('Enter new image alt text:');

    try {
        const response = await fetch(`https://v2.api.noroff.dev/social/posts/${postId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                'x-api-key': apiKey
            },
            body: JSON.stringify({ title, body, tags, media: { url: mediaUrl, alt: mediaAlt } })
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.errors.map(error => error.message).join(', '));
        }
        alert('Post updated successfully!');
        fetchPosts(); // Refresh the posts to show the updated post
    } catch (error) {
        alert('Error updating post: ' + error.message);
    }
}

async function deletePost(postId) {
    const token = localStorage.getItem('token');
    const apiKey = localStorage.getItem('apiKey');

    try {
        const response = await fetch(`https://v2.api.noroff.dev/social/posts/${postId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                'x-api-key': apiKey
            }
        });

        if (response.ok) {
            alert('Post deleted successfully!');
            fetchPosts(); // Refresh the posts to remove the deleted post
        } else {
            const data = await response.json();
            throw new Error(data.errors.map(error => error.message).join(', '));
        }
    } catch (error) {
        alert('Error deleting post: ' + error.message);
    }
}

async function addReaction(postId, symbol) {
    const token = localStorage.getItem('token');
    const apiKey = localStorage.getItem('apiKey');
    try {
        const response = await fetch(`https://v2.api.noroff.dev/social/posts/${postId}/react/${symbol}`, {
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
        alert('Reaction added!');
        fetchPosts(); // Refresh the posts to show the updated reactions
    } catch (error) {
        alert('Error reacting to post: ' + error.message);
    }
}

async function addComment(postId) {
    const token = localStorage.getItem('token');
    const apiKey = localStorage.getItem('apiKey');
    const commentBody = document.getElementById(`comment-${postId}`).value;
    try {
        const response = await fetch(`https://v2.api.noroff.dev/social/posts/${postId}/comment`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                'x-api-key': apiKey
            },
            body: JSON.stringify({ body: commentBody })
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.errors.map(error => error.message).join(', '));
        }
        alert('Comment added!');
        fetchPosts(); // Refresh the posts to show the new comment
    } catch (error) {
        alert('Error adding comment: ' + error.message);
    }
}
