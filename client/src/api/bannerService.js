import { instance } from './axios.config.js';

const BANNER_API = '/banners';

export const bannerService = {
    getAll: async (params = {}) => {
        try {
            const response = await instance.get(BANNER_API, { params });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    getById: async (id) => {
        try {
            const response = await instance.get(`${BANNER_API}/${id}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    create: async (data) => {
        try {
            const response = await instance.post(BANNER_API, data);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    update: async (id, data) => {
        try {
            const response = await instance.put(`${BANNER_API}/${id}`, data);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    toggleStatus: async (id) => {
        try {
            const response = await instance.put(`${BANNER_API}/${id}/status`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    getByPlacement: async (placement, targetAudience = 'All Users') => {
        try {
            const response = await instance.get(`${BANNER_API}/placement/${placement}`, {
                params: { targetAudience }
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    recordImpression: async (id) => {
        try {
            const response = await instance.post(`${BANNER_API}/${id}/impression`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    recordClick: async (id) => {
        try {
            const response = await instance.post(`${BANNER_API}/${id}/click`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    getStats: async () => {
        try {
            const response = await instance.get(`${BANNER_API}/stats`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    duplicate: async (id) => {
        try {
            const response = await instance.post(`${BANNER_API}/${id}/duplicate`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    delete: async (id) => {
        try {
            const response = await instance.delete(`${BANNER_API}/${id}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    }
};

export default bannerService;
