const Product = require('../Models/Products');

// GET /products
exports.getProducts = async (req, res) => {
  try {
    const { search, category, min, max, page = 1, limit = 10 } = req.query;

    const filter = {};

    if (search) {
      filter.name = { $regex: search, $options: 'i' };
    }

    if (category) {
      filter.category = category;
    }

    if (min || max) {
      filter.price = {};
      if (min) filter.price.$gte = parseFloat(min);
      if (max) filter.price.$lte = parseFloat(max);
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const products = await Product.find(filter).skip(skip).limit(parseInt(limit));
    const total = await Product.countDocuments(filter);

    res.status(200).json({
      data: products,
      currentPage: parseInt(page),
      totalPages: Math.ceil(total / limit),
      totalItems: total
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};




exports.createProducts = async (req, res) => {
  try {
    const product = new Product(req.body);
    const savedProduct = await product.save();
    res.status(201).json(savedProduct); 
  } catch (error) {
    res.status(400).json({ error: error.message }); 
  }
};

// GET /products/:id
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// PUT /products/:id
exports.updateProducts = async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ error: 'Product not found' });
    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE /products/:id
exports.deleteProducts = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Product not found' });
    res.status(200).json({ message: 'Product deleted', product: deleted });
  } catch (error) {
    res.status(500).json({ error: error.message  });
  }
};


// PATCH /products/:id/sku
// productsController.js (inside product microservice)
exports.updateSku = async (req, res) => {
  console.log('🛠️ SKU PATCH REQUEST:', {
    productId: req.params.id,
    body: req.body
  });

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { sku: req.body.sku },
      { new: true, runValidators: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(updatedProduct);
  } catch (err) {
    console.error('❌ SKU Update Error:', err.message);
    res.status(500).json({ error: err.message });
  }
};
