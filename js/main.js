import { fetchPosts, createPost, editPost, deletePost, addReaction, addComment } from "./posts";


document.addEventListener('DOMContentLoaded', () => {
    fetchPosts().then(posts => {
        console.log(posts);
        
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
    
    }).catch(error => {
        console.error(error);
    });
});
