const Category = require('../Model/Category');

exports.getCategories = async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * limit;
  
      // Get paginated categories
      const categories = await Category.find().skip(skip).limit(limit);
  
      // Get total count for pagination metadata
      const totalItems = await Category.countDocuments();
  
      res.status(200).json({
        data: categories,
        currentPage: page,
        totalPages: Math.ceil(totalItems / limit),
        totalItems
      });
    } catch (error) {
      res.status(500).send(error.message);
    }
  };
  
exports.createCategory = async (req, res) => {
    try {
        const category = new Category(req.body);
        await category.save();
        res.status(201).send(category);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) return res.status(404).send('Category not found');
        res.send(category);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.updateCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!category) return res.status(404).send('Category not found');
        res.send(category);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.deleteCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);
        if (!category) return res.status(404).send('Category not found');
        res.send(category);
    } catch (error) {
        res.status(500).send(error.message);
    }
};