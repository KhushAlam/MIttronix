import Category from '../models/category.model.js'

export const createCategory = async (req, res)=>{
    try {
        const{
            title,
            description,
            createdBy,
            stock,
            tagID
        } = req.body;

        const newCategory = await Category.create({
            title,
            description,
            createdBy,
            stock,
            tagID
        })
        res.status(201).json({message: "Category created successfully", newCategory});
    } catch (error) {
        res.status(500).json({ message: 'Error creating Category', error: error.message });
    }
}

export const getCategories = async (req,res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories)
    } catch (error) {
        res.status(500).json({ message: 'Error fetching Category', error: error.message });
    }
}

export const editCategory = async (req,res) => {
    try {
        const { id } = req.params;
        const {
            title,
            description,
            createdBy,
            stock,
            tagID
        } = req.body;

        const editedCategory = await Category.findByIdAndUpdate(id, {
            title,
            description,
            createdBy,
            stock,
            tagID
        },{ new: true })

        if(!editedCategory) return res.status(404).json({message: "Category not Found"})

        res.status(200).json({message: "Category edited successfully", editedCategory});
    } catch (error) {
        res.status(500).json({message: "Error editing category", error})
    }
}

export const deleteCategory = async (req,res) => {
    try {
        const { id } = req.params;

        const deletedCategory = await Category.findByIdAndDelete(id);
        
        if(!deletedCategory) return res.status(404).json({message : "Category not Found"})
        
        res.status(200).json({messgae: "Category delted"})
    } catch (error) {
      res.status(500).json({message: "Server Error", error})
    }
}