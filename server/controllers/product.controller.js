import Product from '../models/product.model.js'
import { uploadImage } from '../utils/cloudinary.js';

export const createProduct = async (req,res) => {
    try {
      let imageUrl = "";
      if(req.file){
        const {name, 
            description, 
            category, 
            price, 
            colour, 
            specification, 
            stockStatus,
            stockQuantity, 
            brand, 
            isActive} = req.body;

            if(!name || !price || !description || !category){
                res.status(400).json({
                    message: 'name, price, decription, category are required'
                })
            }
            
            if(!req.file){
              return res.status(400).json({ message: 'Image file is required' });
            }

            const result = await uploadImage(req.file.buffer);
            imageUrl = result.secure_url;

            const newProduct = await Product.create({
                name,
                description,
                category, 
                imageUrl:{
                  url: imageUrl,
                  public_id: result.public_id
                }, 
                price, 
                colour, 
                specification, 
                stockQuantity: stockQuantity || 0, 
                brand,
                stockStatus,
                isActive
            })
            res.status(201).json({message: "Product created successfully", newProduct});
      }
      else {
        res.status(400).json({ message: 'Image file is required' });
      }
        
    } catch (error) {
        res.status(500).json({ message: 'Error creating Product', error: error.message });
    }
}

export const getProducts = async (req, res) => {
    try {
      const {
        search,
        category,
        minPrice,
        maxPrice,
        stockStatus,
      } = req.query;

      // const filter = await Product.find({});
      const filter = {}

      if (search) {
    const regex = new RegExp(search, "i");
    filter.$or = [
      { name: { $regex: regex } },
      { description: { $regex: regex } }
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

export const updateProduct = async (req,res) => {
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
        isActive} = req.body;

        const updatedProduct = await Product.findByIdAndUpdate(id,{
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
          isActive
        },{ new: true });
        res.status(200).json({message: "Product Upadted", updatedProduct});
    } catch (error) {
      res.status(500).json({ message: "Error updating Product", error });
    }
}

export const deleteProduct = async (req,res) => {
    try {
        const { id } = req.params;

        const deletedProduct = await Product.findByIdAndDelete(id);
        
        if(!deletedProduct) return res.status(404).json({message : "Product not Found"})
        
        res.status(200).json({messgae: "product delted"})
    } catch (error) {
      res.status(500).json({message: "Server Error", error})
    }
}