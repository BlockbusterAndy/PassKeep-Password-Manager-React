import apiService from "../services/apiService";

export const registerUser = async ({name, email, password}) => {
    try {
        const response = await apiService.register({name, email, password});
        return response.user;
    } catch (error) {
        console.error('Registration failed:', error);
        throw error;
    }
}

export const loginUser = async ({email, password}) => {
    try {
        const response = await apiService.login({email, password});
        return response.user;
    } catch (error) {
        console.error('Login failed:', error);
        throw error;
    }
}

export const logoutUser = async () => {
    try {
        await apiService.logout();
    } catch (error) {
        console.error('Logout failed:', error);
        throw error;
    }
}