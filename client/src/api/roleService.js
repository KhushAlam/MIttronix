import axiosInstance from './axios.config.js';

const ROLE_API = '/roles';

export const roleService = {
    // Get all roles with pagination and filtering
    getAll: async (params = {}) => {
        try {
            const response = await axiosInstance.get(ROLE_API, { params });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Get role by ID
    getById: async (id) => {
        try {
            const response = await axiosInstance.get(`${ROLE_API}/${id}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Create new role
    create: async (data) => {
        try {
            const response = await axiosInstance.post(ROLE_API, data);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Update role
    update: async (id, data) => {
        try {
            const response = await axiosInstance.put(`${ROLE_API}/${id}`, data);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Toggle role status
    toggleStatus: async (id) => {
        try {
            const response = await axiosInstance.put(`${ROLE_API}/${id}/status`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Add permission to role
    addPermission: async (id, module, action) => {
        try {
            const response = await axiosInstance.post(`${ROLE_API}/${id}/permissions`, { module, action });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Remove permission from role
    removePermission: async (id, module, action) => {
        try {
            const response = await axiosInstance.delete(`${ROLE_API}/${id}/permissions`, { 
                data: { module, action } 
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Get role statistics
    getStats: async () => {
        try {
            const response = await axiosInstance.get(`${ROLE_API}/stats`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Get available permission options
    getPermissionOptions: async () => {
        try {
            const response = await axiosInstance.get(`${ROLE_API}/permissions`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Duplicate role
    duplicate: async (id) => {
        try {
            const response = await axiosInstance.post(`${ROLE_API}/${id}/duplicate`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Delete role
    delete: async (id) => {
        try {
            const response = await axiosInstance.delete(`${ROLE_API}/${id}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    }
};

export default roleService;
