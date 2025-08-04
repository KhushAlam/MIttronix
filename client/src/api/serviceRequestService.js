import { mockServiceRequests, mockUsers } from "./mockData.js";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const serviceRequestService = {
  getAll: async (params = {}) => {
    try {
      await delay(500);

      let filteredRequests = [...mockServiceRequests];

      if (params.status && params.status !== "All Status") {
        filteredRequests = filteredRequests.filter(
          (req) => req.status === params.status
        );
      }

      if (params.priority && params.priority !== "All Priorities") {
        filteredRequests = filteredRequests.filter(
          (req) => req.priority === params.priority
        );
      }

      if (params.type && params.type !== "All Types") {
        filteredRequests = filteredRequests.filter(
          (req) => req.type === params.type
        );
      }

      if (params.search) {
        const searchLower = params.search.toLowerCase();
        filteredRequests = filteredRequests.filter(
          (req) =>
            req.id.toLowerCase().includes(searchLower) ||
            req.product.toLowerCase().includes(searchLower) ||
            req.userInfo.name.toLowerCase().includes(searchLower)
        );
      }

      const page = parseInt(params.page) || 1;
      const limit = parseInt(params.limit) || 10;
      const start = (page - 1) * limit;
      const end = start + limit;

      const paginatedRequests = filteredRequests.slice(start, end);

      return {
        data: paginatedRequests,
        pagination: {
          current: page,
          total: Math.ceil(filteredRequests.length / limit),
          count: filteredRequests.length,
        },
      };
    } catch (error) {
      throw error;
    }
  },
  getById: async (id) => {
    try {
      await delay(300);
      const request = mockServiceRequests.find((req) => req.id === id);
      if (!request) {
        throw { message: "Service request not found" };
      }
      return request;
    } catch (error) {
      throw error;
    }
  },
  create: async (data) => {
    try {
      await delay(800);
      const newRequest = {
        id: `SR-2024-${String(mockServiceRequests.length + 1).padStart(
          3,
          "0"
        )}`,
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        assignedTo: "Support Team",
      };
      mockServiceRequests.unshift(newRequest);
      return newRequest;
    } catch (error) {
      throw error;
    }
  },

  update: async (id, data) => {
    try {
      const response = await axiosInstance.put(
        `${SERVICE_REQUEST_API}/${id}`,
        data
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  addComment: async (id, commentData) => {
    try {
      const response = await axiosInstance.post(
        `${SERVICE_REQUEST_API}/${id}/comments`,
        commentData
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  assign: async (id, assignedTo) => {
    try {
      const response = await axiosInstance.put(
        `${SERVICE_REQUEST_API}/${id}/assign`,
        { assignedTo }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  getStats: async () => {
    try {
      await delay(400);
      const stats = {
        overview: {
          open: mockServiceRequests.filter((req) => req.status === "Open")
            .length,
          inProgress: mockServiceRequests.filter(
            (req) => req.status === "In Progress"
          ).length,
          resolved: mockServiceRequests.filter(
            (req) => req.status === "Resolved"
          ).length,
          closed: mockServiceRequests.filter((req) => req.status === "Closed")
            .length,
        },
        byPriority: {
          high: mockServiceRequests.filter((req) => req.priority === "High")
            .length,
          medium: mockServiceRequests.filter((req) => req.priority === "Medium")
            .length,
          low: mockServiceRequests.filter((req) => req.priority === "Low")
            .length,
        },
        total: mockServiceRequests.length,
      };
      return stats;
    } catch (error) {
      throw error;
    }
  },

  delete: async (id) => {
    try {
      const response = await axiosInstance.delete(
        `${SERVICE_REQUEST_API}/${id}`
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};

export default serviceRequestService;
