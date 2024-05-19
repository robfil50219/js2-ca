import { fetchPosts, createPost, editPost, deletePost, addReaction, addComment } from './modules/posts.js';

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const posts = await fetchPosts();
        console.log('Posts:', posts);
        // Display posts on the page
        const contentDiv = document.getElementById('content');
        posts.data.forEach(post => {
            const postDiv = document.createElement('div');
            postDiv.className = 'post';
            postDiv.innerHTML = `
                <h3>${post.title}</h3>
                <p>${post.body}</p>
                <img src="${post.media.url}" alt="${post.media.alt}" class="post-image">
                <button onclick="deletePost(${post.id})" class="btn btn-danger">Delete Post</button>
            `;
            contentDiv.appendChild(postDiv);
        });
    } catch (error) {
        console.error('Failed to fetch posts:', error);
        alert('Failed to fetch posts: ' + error.message); // Display error message
    }
});

document.getElementById('createPostBtn').addEventListener('click', async () => {
    const title = prompt('Enter post title:');
    const body = prompt('Enter post body:');
    const tags = prompt('Enter tags, separated by commas:').split(',');
    const mediaUrl = prompt('Enter image URL:');
    const mediaAlt = prompt('Enter image alt text:');

    try {
        const post = await createPost(title, body, tags, { url: mediaUrl, alt: mediaAlt });
        console.log('Post created:', post);
        alert('Post created successfully'); // Display success message
    } catch (error) {
        console.error('Failed to create post:', error);
        alert('Failed to create post: ' + error.message); // Display error message
    }
});


