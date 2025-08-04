import { mockBlogs, mockBlogCategories } from './mockData.js';

// Mock delay to simulate API response time
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const blogService = {
    // Get all blogs with pagination and filtering
    getAll: async (params = {}) => {
        try {
            await delay(500);

            let filteredBlogs = [...mockBlogs];

            // Apply filters
            if (params.status && params.status !== 'All Status') {
                filteredBlogs = filteredBlogs.filter(blog => blog.status === params.status.toLowerCase());
            }

            if (params.category && params.category !== 'All Categories') {
                filteredBlogs = filteredBlogs.filter(blog =>
                    blog.category.toLowerCase() === params.category.toLowerCase()
                );
            }

            if (params.search) {
                const searchLower = params.search.toLowerCase();
                filteredBlogs = filteredBlogs.filter(blog =>
                    blog.title.toLowerCase().includes(searchLower) ||
                    blog.excerpt.toLowerCase().includes(searchLower) ||
                    blog.author.name.toLowerCase().includes(searchLower)
                );
            }

            // Sort by date (newest first)
            filteredBlogs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

            // Pagination
            const page = parseInt(params.page) || 1;
            const limit = parseInt(params.limit) || 10;
            const start = (page - 1) * limit;
            const end = start + limit;

            const paginatedBlogs = filteredBlogs.slice(start, end);

            return {
                data: paginatedBlogs,
                pagination: {
                    current: page,
                    total: Math.ceil(filteredBlogs.length / limit),
                    count: filteredBlogs.length
                }
            };
        } catch (error) {
            throw error;
        }
    },

    // Get blog by ID or slug
    getById: async (id) => {
        try {
            await delay(300);
            const blog = mockBlogs.find(blog => blog.id === id || blog.slug === id);
            if (!blog) {
                throw { message: 'Blog not found' };
            }
            return blog;
        } catch (error) {
            throw error;
        }
    },

    // Create new blog
    create: async (data) => {
        try {
            await delay(800);
            const newBlog = {
                id: `blog-${String(mockBlogs.length + 1).padStart(3, '0')}`,
                slug: data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
                ...data,
                author: {
                    name: 'Admin User',
                    email: 'admin@mittronix.com',
                    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
                },
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                publishedAt: data.status === 'published' ? new Date().toISOString() : null,
                readTime: Math.ceil(data.content.length / 1000),
                views: 0,
                likes: 0,
                comments: 0
            };
            mockBlogs.unshift(newBlog);
            return newBlog;
        } catch (error) {
            throw error;
        }
    },

    // Update blog
    update: async (id, data) => {
        try {
            const response = await axiosInstance.put(`${BLOG_API}/${id}`, data);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Toggle blog status (publish/unpublish)
    toggleStatus: async (id, status) => {
        try {
            const response = await axiosInstance.put(`${BLOG_API}/${id}/status`, { status });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Toggle featured status
    toggleFeatured: async (id) => {
        try {
            const response = await axiosInstance.put(`${BLOG_API}/${id}/featured`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Get blog statistics
    getStats: async () => {
        try {
            await delay(400);
            const stats = {
                total: mockBlogs.length,
                published: mockBlogs.filter(blog => blog.status === 'published').length,
                draft: mockBlogs.filter(blog => blog.status === 'draft').length,
                featured: mockBlogs.filter(blog => blog.isFeatured).length,
                totalViews: mockBlogs.reduce((sum, blog) => sum + blog.views, 0),
                totalLikes: mockBlogs.reduce((sum, blog) => sum + blog.likes, 0)
            };
            return stats;
        } catch (error) {
            throw error;
        }
    },

    // Get featured blogs
    getFeatured: async (limit = 5) => {
        try {
            await delay(300);
            const featuredBlogs = mockBlogs
                .filter(blog => blog.isFeatured && blog.status === 'published')
                .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
                .slice(0, limit);
            return featuredBlogs;
        } catch (error) {
            throw error;
        }
    },

    // Delete blog
    delete: async (id) => {
        try {
            const response = await axiosInstance.delete(`${BLOG_API}/${id}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    }
};

export default blogService;
