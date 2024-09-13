import axios from 'axios';
import { getAccessToken } from './tokenService';

const API_URL = 'http://127.0.0.1:8000/blog/blogposts/';

export const getBlogPosts = async () => {
    const token = getAccessToken();
    if (token) {
        return axios.get(API_URL, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    } else {
        throw new Error('No access token availabe')
    }
};

export const getBlogPost = (id) => {
    const token = getAccessToken()
    if (token) {
        return axios.get(`${API_URL}${id}/`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

    }

}

export const createBlogPost = (data) => {
    const token = getAccessToken()
    if (token) {
        return axios.post(API_URL, data, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        });
    } else {
        throw new Error('No access token available')
    }


}

export const updateBlogPost = (id, data) => {
    const token = getAccessToken();
    if (token) {
        return axios.put(`${API_URL}${id}/`, data, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });
    } else {
        throw new Error('No access token available');
    }
};

export const deleteBlogPost = async (id) => {
    const token = getAccessToken();
    if (token) {
        return await axios.delete(`${API_URL}${id}/`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    } else {
        throw new Error('No access token available');
    }
};
