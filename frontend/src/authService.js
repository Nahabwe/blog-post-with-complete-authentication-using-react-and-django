
import axios from 'axios';
import { clearTokens, getAccessToken, setTokens } from './tokenService';

const API_URL = 'http://127.0.0.1:8000/user/';



export const register = async (userData) => {
    return axios.post(`${API_URL}register/`, userData);
};

export const login = async ({ username, password }) => {
    try {
        const response = await axios.post('http://127.0.0.1:8000/user/login/', {
            username: username,
            password: password,
        });

        const { access, refresh } = response.data;

        setTokens({ access, refresh });
        return response;
    } catch (error) {
        if (error.response) {

            console.error('Server Error:', error.response.data);
        } else if (error.request) {

            console.error('Network Error:', error.request);
        } else {

            console.error('Error:', error.message);
        }
        throw error;
    }
};


export const logout = async () => {
    try {
        await axios.post('http://127.0.0.1:8000/user/logout/', {}, {
            headers: {
                'Authorization': `Bearer ${getAccessToken()}`
            }
        });
    } catch (error) {
        console.error('Logout Error:', error);
    } finally {
        clearTokens();
    }
};

export const forgotPassword = async (email) => {
    return axios.post(`${API_URL}forgot-password/`, { email });
};

export const resetPassword = async (data) => {
    return axios.post(`${API_URL}reset-password/`, data);
};


