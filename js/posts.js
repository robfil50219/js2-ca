import { apiRequest } from "./api"; 

async function fetchPosts(page = 1, limit = 10, sort = 'created', sortOrder = 'desc' , tag = ''){
    const token = localStorage.getItem('token');
    const apiKey= localStorage.getItem(apiKey); 
    const endpoint = `/social/posts?page=${page}&limit=${limit}&sort=${sort}&sortOrder=${sortOrder}${tag ? `&_tag=${tag}` : ''}&_author=true&_comments=true&_reactions=true`;
    return await apiRequest(endpoint,'GET', null, token, apiKey);
}

async function createPost(title, body, tags, media) {
    const token = localStorage.getItem('token');
    const apiKey = localStorage.getItem('apiKey');
    return await apiRequest ('/social/posts', 'Post',{ title, body, tags, media }, token, apiKey); 
}

async function editPost(postId, title, body, tags, media) {
    const token = localStorage.getItem('token');
    const apiKey = localStorage.getItem('apiKey');
    return await apiRequest(`/social/posts/${postId}`, 'PUT', { title, body, tags, media }, token, apiKey);
}

