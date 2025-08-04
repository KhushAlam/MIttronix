import Blogs from "../models/blog.model";

export const createBlog = async (req, res) => {
    try {
        const {
            title,
            excerpt,
            category,
            imageUrl,
            tags,
            content,
        } = req.body;

        const newBlog = await Blogs.create({
            title,
            excerpt,
            category,
            imageUrl,
            tags,
            content,
        })

        res.status(200).json({
            message: "Blog created succesfully",
            newBlog
        })

    } catch (error) {
        res.status(500).json({
            message: "Error creating blogs",
            error
        })
    }
}

export const getBlogs = async (req, res) => {
    try {
        const blogs = await Blogs.find();

        if(!blogs){
            return res.status(404).json({
                messgae: "No blog found! create one"
            })
        }

        res.status(200).json({
            messgae: "succesgully get blogs",
            blogs
        });
    } catch (error) {
        res.status(500).json({
            message: "Error getting blogs",
            error: error.message
        });
    }
};

export const getBlogById = async (req, res) => {
    try {
        const blog = await Blogs.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }
        res.status(200).json(blog);
    } catch (error) {
        res.status(500).json({
            message: "Error retrieving blog",
            error: error.message
        });
    }
};

export const editBlog = async (req, res) => {
    try {
        const updatedBlog = await Blogs.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedBlog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        res.status(200).json(updatedBlog);
    } catch (error) {
        res.status(500).json({
            message: "Error updating blog",
            error: error.message
        });
    }
};

export const deleteBlog = async (req, res) => {
    try {
        const deletedBlog = await Blogs.findByIdAndDelete(req.params.id);

        if (!deletedBlog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        res.status(200).json({ message: "Blog deleted successfully" });
    } catch (error) {
        res.status(500).json({
            message: "Error deleting blog",
            error: error.message
        });
    }
};
