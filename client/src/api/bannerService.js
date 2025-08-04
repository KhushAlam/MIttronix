import axiosInstance from './axios.config.js';

const BANNER_API = '/banners';

export const bannerService = {
    // Get all banners with pagination and filtering
    getAll: async (params = {}) => {
        try {
            const response = await axiosInstance.get(BANNER_API, { params });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Get banner by ID
    getById: async (id) => {
        try {
            const response = await axiosInstance.get(`${BANNER_API}/${id}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Create new banner
    create: async (data) => {
        try {
            const response = await axiosInstance.post(BANNER_API, data);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Update banner
    update: async (id, data) => {
        try {
            const response = await axiosInstance.put(`${BANNER_API}/${id}`, data);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Toggle banner status
    toggleStatus: async (id) => {
        try {
            const response = await axiosInstance.put(`${BANNER_API}/${id}/status`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Get active banners by placement
    getByPlacement: async (placement, targetAudience = 'All Users') => {
        try {
            const response = await axiosInstance.get(`${BANNER_API}/placement/${placement}`, {
                params: { targetAudience }
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Record banner impression
    recordImpression: async (id) => {
        try {
            const response = await axiosInstance.post(`${BANNER_API}/${id}/impression`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Record banner click
    recordClick: async (id) => {
        try {
            const response = await axiosInstance.post(`${BANNER_API}/${id}/click`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Get banner statistics
    getStats: async () => {
        try {
            const response = await axiosInstance.get(`${BANNER_API}/stats`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Duplicate banner
    duplicate: async (id) => {
        try {
            const response = await axiosInstance.post(`${BANNER_API}/${id}/duplicate`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Delete banner
    delete: async (id) => {
        try {
            const response = await axiosInstance.delete(`${BANNER_API}/${id}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    }
};

export default bannerService;
