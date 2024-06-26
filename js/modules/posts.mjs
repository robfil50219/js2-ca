import { apiRequest } from './api.mjs';

async function fetchPosts(page = 1, limit = 10, sort = 'created', sortOrder = 'desc', tag = '') {
    const token = localStorage.getItem('token');
    const apiKey = localStorage.getItem('apiKey');
    const endpoint = `/social/posts?page=${page}&limit=${limit}&sort=${sort}&sortOrder=${sortOrder}${tag ? `&_tag=${tag}` : ''}&_author=true&_comments=true&_reactions=true`;
    return await apiRequest(endpoint, 'GET', null, token, apiKey);
}

async function createPost(title, body, tags, media) {
    const token = localStorage.getItem('token');
    const apiKey = localStorage.getItem('apiKey');
    return await apiRequest('/social/posts', 'POST', { title, body, tags, media }, token, apiKey);
}

async function editPost(postId, title, body, tags, media) {
    const token = localStorage.getItem('token');
    const apiKey = localStorage.getItem('apiKey');
    return await apiRequest(`/social/posts/${postId}`, 'PUT', { title, body, tags, media }, token, apiKey);
}

async function deletePost(postId) {
    const token = localStorage.getItem('token');
    const apiKey = localStorage.getItem('apiKey');
    return await apiRequest(`/social/posts/${postId}`, 'DELETE', null, token, apiKey);
}

async function addReaction(postId, symbol) {
    const token = localStorage.getItem('token');
    const apiKey = localStorage.getItem('apiKey');
    return await apiRequest(`/social/posts/${postId}/react/${symbol}`, 'PUT', null, token, apiKey);
}

async function addComment(postId, body) {
    const token = localStorage.getItem('token');
    const apiKey = localStorage.getItem('apiKey');
    return await apiRequest(`/social/posts/${postId}/comment`, 'POST', { body }, token, apiKey);
}



export { fetchPosts, createPost, editPost, deletePost, addReaction, addComment };

