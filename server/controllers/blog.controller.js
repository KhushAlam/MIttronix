import Blogs from "../models/blog.model.js";
import { uploadBlogImage } from "../utils/cloudinary.js";

export const createBlog = async (req, res) => {
  try {
    const { title, excerpt, category, tags } = req.body;

    let parsedContentBlocks = [];
    if (req.body.contentBlocks) {
      parsedContentBlocks = JSON.parse(req.body.contentBlocks);
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "At least one image file is required" });
    }

    const uploadPromises = req.files.map((file) => uploadBlogImage(file.buffer));
    const uploadResults = await Promise.all(uploadPromises);

    const contentBlocks = parsedContentBlocks.map((block, index) => ({
      text: block.text || "",
      image: uploadResults[index]?.secure_url || null,
    }));

    const newBlog = await Blogs.create({
      title,
      excerpt,
      category,
      tags,
      contentBlocks,
    });

    res.status(200).json({
      message: "Blog created successfully",
      newBlog,
    });
  } catch (error) {
    console.error("Error creating blog:", error);
    res.status(500).json({
      message: "Error creating blog",
      error,
    });
  }
};


export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blogs.find();

    if (!blogs) {
      return res.status(404).json({
        messgae: "No blog found! create one",
      });
    }

    res.status(200).json({
      messgae: "succesgully get blogs",
      blogs,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error getting blogs",
      error: error.message,
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
      error: error.message,
    });
  }
};

export const editBlog = async (req, res) => {
  try {
    const blogId = req.params.id;

    const { title, excerpt, category, tags } = req.body;

    let parsedContentBlocks = [];
    if (req.body.contentBlocks) {
      parsedContentBlocks = JSON.parse(req.body.contentBlocks);
    }

    let updatedContentBlocks = [...parsedContentBlocks];

    if (req.files && req.files.length > 0) {
      const uploadPromises = req.files.map((file) => uploadBlogImage(file.buffer));
      const uploadResults = await Promise.all(uploadPromises);

      updatedContentBlocks = parsedContentBlocks.map((block, index) => ({
        ...block,
        image: uploadResults[index]?.secure_url || block.image || null,
      }));
    }

    const updatedBlog = await Blogs.findByIdAndUpdate(
      blogId,
      {
        title,
        excerpt,
        category,
        tags,
        contentBlocks: updatedContentBlocks,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json({
      message: "Blog updated successfully",
      updatedBlog,
    });
  } catch (error) {
    console.error("Error updating blog:", error);
    res.status(500).json({
      message: "Error updating blog",
      error: error.message,
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
      error: error.message,
    });
  }
};
