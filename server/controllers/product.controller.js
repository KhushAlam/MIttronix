import Product from "../models/product.model.js";
import { uploadImage } from "../utils/cloudinary.js";

export const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      category,
      price,
      colour,
      specification,
      stockStatus,
      stockQuantity,
      brand,
      isActive,
    } = req.body;

    if (!name || !price || !description || !category) {
      return res.status(400).json({
        message: "name, price, description, category are required",
      });
    }

    if (!req.files || req.files.length === 0) {
      return res
        .status(400)
        .json({ message: "At least one image file is required" });
    }

    // Upload all images to cloudinary
    const uploadPromises = req.files.map((file) => uploadImage(file.buffer));
    const uploadResults = await Promise.all(uploadPromises);

    // Create images array with url and public_id
    const images = uploadResults.map((result) => ({
      url: result.secure_url,
      public_id: result.public_id,
    }));

    const newProduct = await Product.create({
      name,
      description,
      category,
      images,
      price,
      colour,
      specification,
      stockQuantity: stockQuantity || 0,
      brand,
      stockStatus,
      isActive,
    });

    res
      .status(201)
      .json({ message: "Product created successfully", newProduct });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating Product", error: error.message });
  }
};

export const getProducts = async (req, res) => {
  try {
    const { search, category, minPrice, maxPrice, stockStatus } = req.query;

    // const filter = await Product.find({});
    const filter = {};

    if (search) {
      const regex = new RegExp(search, "i");
      filter.$or = [
        { name: { $regex: regex } },
        { description: { $regex: regex } },
      ];
    }

    if (category) {
      filter.category = category;
    }

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    if (stockStatus) {
      filter.stockStatus = stockStatus;
    }

    const products = await Product.find(filter);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      description,
      category,
      imageUrl,
      price,
      colour,
      specification,
      stockQuantity,
      stockStatus,
      brand,
      isActive,
    } = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        name,
        description,
        category,
        imageUrl,
        price,
        colour,
        specification,
        stockQuantity,
        stockStatus,
        brand,
        isActive,
      },
      { new: true }
    );
    res.status(200).json({ message: "Product Upadted", updatedProduct });
  } catch (error) {
    res.status(500).json({ message: "Error updating Product", error });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct)
      return res.status(404).json({ message: "Product not Found" });

    res.status(200).json({ messgae: "product delted" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};
