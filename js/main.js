import { fetchPosts, createPost, editPost, deletePost, addReaction, addComment } from "./modules/posts";


document.addEventListener('DOMContentLoaded', () => {
    fetchPosts().then(posts => {
        console.log(posts);
        displayPosts(posts);
    }).catch(error => {
        console.error(error);
    });
});

document.getElementById('createPostBtn').addEventListener('click', () => {
    const title = prompt('Enter post title:');
    const body = prompt('Enter post body:');
    const tags = prompt('Enter tags, separated by commas:').split(',');
    const mediaUrl = prompt('Enter image URL:');
    const mediaAlt = prompt('Enter image alt text:');

    createPost(title, body, tags, { url: mediaUrl, alt: mediaAlt }).then(post => {
        console.log('Post created:', post);
        
        fetchPosts().then(posts => {
            displayPosts(posts);
        }).catch(error => {
            console.error(error);
        });
    }).catch(error => {
        console.error(error);
    });
});

function displayPosts(posts) {
    const contentDiv = document.getElementById('content');
    contentDiv.innerHTML = ''; 
    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('post');
        postElement.innerHTML = `
            <h2>${post.title}</h2>
            <p>${post.body}</p>
            <p><strong>Tags:</strong> ${post.tags.join(', ')}</p>
            ${post.media ? `<img src="${post.media.url}" alt="${post.media.alt}">` : ''}
            <button onclick="editPost(${post.id})">Edit</button>
            <button onclick="deletePost(${post.id})">Delete</button>
        `;
        contentDiv.appendChild(postElement);
    });
}
