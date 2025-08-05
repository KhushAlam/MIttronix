import { instance } from './axios.config.js';

const ROLE_API = '/roles';

export const roleService = {
    getAll: async (params = {}) => {
        try {
            const response = await instance.get(ROLE_API, { params });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    getById: async (id) => {
        try {
            const response = await instance.get(`${ROLE_API}/${id}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    create: async (data) => {
        try {
            const response = await instance.post(ROLE_API, data);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    update: async (id, data) => {
        try {
            const response = await instance.put(`${ROLE_API}/${id}`, data);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    toggleStatus: async (id) => {
        try {
            const response = await instance.put(`${ROLE_API}/${id}/status`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    addPermission: async (id, module, action) => {
        try {
            const response = await instance.post(`${ROLE_API}/${id}/permissions`, { module, action });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    removePermission: async (id, module, action) => {
        try {
            const response = await instance.delete(`${ROLE_API}/${id}/permissions`, {
                data: { module, action }
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    getStats: async () => {
        try {
            const response = await instance.get(`${ROLE_API}/stats`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    getPermissionOptions: async () => {
        try {
            const response = await instance.get(`${ROLE_API}/permissions`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    duplicate: async (id) => {
        try {
            const response = await instance.post(`${ROLE_API}/${id}/duplicate`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    delete: async (id) => {
        try {
            const response = await instance.delete(`${ROLE_API}/${id}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    }
};

export default roleService;
