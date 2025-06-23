import axios from 'axios';

const url = import.meta.env.VITE_API_URL;

const apiClient = axios.create({
    baseURL: url,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    withCredentials: true,
});

const apiService = {    //register user
    register: async (userData) => {
        try {
            const response = await apiClient.post('auth/register', userData);
            return response.data;
        } catch (error) {
            console.error('Registration failed:', error);
            // Throw server response message instead of axios error
            if (error.response && error.response.data) {
                throw error.response.data.message;
            }
            throw { status: false, message: "Network error occurred" };
        }
    },    //login user
    login: async (credentials) => {
        try {
            const response = await apiClient.post('auth/login', credentials);
            return response.data;
        } catch (error) {
            console.error('Login failed:', error);
            // Throw server response message instead of axios error
            if (error.response && error.response.data) {
                throw error.response.data.message;
            }
            throw { status: false, message: "Network error occurred" };
        }
    },    //logout user
    logout: async () => {
        try {
            await apiClient.post('auth/logout');
        } catch (error) {
            console.error('Logout failed:', error);
            // Throw server response message instead of axios error
            if (error.response && error.response.data) {
                throw error.response.data.message;
            }
            throw { status: false, message: "Network error occurred" };
        }
    },
}

export default apiService;
