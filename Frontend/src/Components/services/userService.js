import axios from 'axios';

const getUserInfo = async () => {
    try {
        const response = await axios.get('/api/user/info'); // Replace with your backend endpoint
        return response.data;
    } catch (error) {
        console.error('Error fetching user info:', error);
        throw error;
    }
};

export { getUserInfo };