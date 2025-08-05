import { instance } from './axios.config.js'
import { mockBlogs, mockBlogCategories } from './mockData.js';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const blogService = {
    getAll: async (params = {}) => {
        try {
            // Try API first
            const response = await instance.get('/blogs', { params });
            return response.data;
        } catch (apiError) {
            console.log('Blog API unavailable, using mock data', apiError);
            // Fallback to mock data
            await delay(500);

            let filteredBlogs = [...mockBlogs];

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

            filteredBlogs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

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
        }
    },

    getById: async (id) => {
        try {
            // Try API first
            const response = await instance.get(`/blogs/${id}`);
            return response.data;
        } catch (apiError) {
            console.log('Blog getById API unavailable, using mock data', apiError);
            // Fallback to mock data
            await delay(300);
            const blog = mockBlogs.find(blog => blog.id === id || blog.slug === id);
            if (!blog) {
                throw new Error('Blog not found');
            }
            return blog;
        }
    },

    create: async (data) => {
        try {
            // Try API first
            const response = await instance.post('/blogs', data);
            return response.data;
        } catch (apiError) {
            console.log('Blog create API unavailable, using mock data', apiError);
            // Fallback to mock data creation
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
        }
    },

    update: async (id, data) => {
        try {
            await delay(600);
            const blogIndex = mockBlogs.findIndex(blog => blog.id === id || blog.slug === id);
            if (blogIndex === -1) {
                throw new Error(`Blog not found with id: ${id}`);
            }

            const updatedBlog = {
                ...mockBlogs[blogIndex],
                ...data,
                updatedAt: new Date().toISOString(),
                readTime: data.content ? Math.ceil(data.content.length / 1000) : mockBlogs[blogIndex].readTime
            };

            if (data.title && data.title !== mockBlogs[blogIndex].title) {
                updatedBlog.slug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
            }

            mockBlogs[blogIndex] = updatedBlog;
            return updatedBlog;
        } catch (error) {
            console.error('Error updating blog:', error);
            throw error;
        }
    },

    toggleStatus: async (id, status) => {
        try {
            await delay(400);
            const blogIndex = mockBlogs.findIndex(blog => blog.id === id || blog.slug === id);
            if (blogIndex === -1) {
                throw new Error(`Blog not found with id: ${id}`);
            }

            mockBlogs[blogIndex].status = status.toLowerCase();
            mockBlogs[blogIndex].updatedAt = new Date().toISOString();

            if (status.toLowerCase() === 'published' && !mockBlogs[blogIndex].publishedAt) {
                mockBlogs[blogIndex].publishedAt = new Date().toISOString();
            }

            return mockBlogs[blogIndex];
        } catch (error) {
            console.error('Error toggling blog status:', error);
            throw error;
        }
    },

    toggleFeatured: async (id) => {
        try {
            await delay(400);
            console.log('toggleFeatured called with id:', id);
            console.log('Available blogs:', mockBlogs.map(b => ({ id: b.id, title: b.title })));

            const blogIndex = mockBlogs.findIndex(blog => blog.id === id || blog.slug === id);
            if (blogIndex === -1) {
                throw new Error(`Blog not found with id: ${id}`);
            }

            mockBlogs[blogIndex].isFeatured = !mockBlogs[blogIndex].isFeatured;
            mockBlogs[blogIndex].updatedAt = new Date().toISOString();

            console.log('Blog featured status updated:', mockBlogs[blogIndex]);
            return mockBlogs[blogIndex];
        } catch (error) {
            console.error('Error toggling featured status:', error);
            throw error;
        }
    },

    getStats: async () => {
        try {
            // Try API first
            const response = await instance.get('/blogs/stats');
            return response.data;
        } catch (apiError) {
            console.log('Blog stats API unavailable, using mock data', apiError);
            // Fallback to mock data
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
        }
    },

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

    delete: async (id) => {
        try {
            await delay(400);
            const blogIndex = mockBlogs.findIndex(blog => blog.id === id || blog.slug === id);
            if (blogIndex === -1) {
                throw new Error(`Blog not found with id: ${id}`);
            }

            const deletedBlog = mockBlogs.splice(blogIndex, 1)[0];
            return { message: 'Blog deleted successfully', blog: deletedBlog };
        } catch (error) {
            console.error('Error deleting blog:', error);
            throw error;
        }
    }
};

export default blogService;
