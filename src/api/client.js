export const API_URL = 'https://questlog-backend-apoy.onrender.com/api';

export const api = async (endpoint, options = {}) => {
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    const config = {
        ...options,
        headers,
    };

    try {
        const response = await fetch(`${API_URL}${endpoint}`, config);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'API Request Failed');
        }

        return data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};
