const express = require('express');
const router = express.Router();
const axios = require('axios');
const FormData = require('form-data'); // required for multipart forwarding
const multer = require('multer');
const upload = multer(); // temporary storage
const { requireAuthorization, requireAuthentication } = require('../authMiddleware');

const SERVICE_URL = 'http://product-service:4000/products';

router.get('/', async (req, res) => {
  try {
    const response = await axios.get(`${SERVICE_URL}`, {
      params: req.query,
    });

    res.json(response.data);
  } catch (err) {
    console.error('❌ Product list proxy error:', {
      status: err.response?.status,
      data: err.response?.data,
      message: err.message,
    });

    res.status(500).json({ error: 'Product service failed' });
  }
});



router.post('/', requireAuthorization, requireAuthentication, async (req, res) => {
  try {
    const response = await axios.post(`${SERVICE_URL}`, req.body, {
      headers: {
        Authorization: req.headers.authorization
      }
    });
    res.json(response.data);
  }
  catch (err) {
    console.error('❌ Proxy Error:', {
      status: err.response?.status,
      data: err.response?.data,
      message: err.message,
    });
    res.status(500).json({ error: 'Product service failed' });
  }

});

router.post('/upload-images', requireAuthorization, requireAuthentication, upload.array('images', 5), async (req, res) => {
  try {
    const formData = new FormData();

    req.files.forEach((file) => {
      formData.append('images', file.buffer, {
        filename: file.originalname,
        contentType: file.mimetype,
      });
    });

    const response = await axios.post(`${SERVICE_URL}/upload-images`, formData, {
      headers: {
        ...formData.getHeaders(),
        Authorization: req.headers.authorization,
      },
    });

    res.json(response.data);
  } catch (err) {
    console.error('❌ Image Upload Proxy Error:', err.message);
    res.status(500).json({ error: 'Image upload failed' });
  }
});


router.get('/:id', async (req, res) => {
  try {
    const response = await axios.get(`${SERVICE_URL}/${req.params.id}`);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Product service failed' });
  }
});

router.put('/:id', requireAuthorization, requireAuthentication, async (req, res) => {
  try {
    const response = await axios.put(`${SERVICE_URL}/${req.params.id}`, req.body, {
      headers: {
        Authorization: req.headers.authorization
      }
    });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Product service failed' });
  }
});

router.delete('/:id', requireAuthorization, requireAuthentication, async (req, res) => {
  try {
    const response = await axios.delete(`${SERVICE_URL}/${req.params.id}`, {
      headers: {
        Authorization: req.headers.authorization
      }
    });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Product service failed' });
  }
});

// PATCH /products/:id/sku – Update SKU
router.patch('/:id/sku', async (req, res) => {
  try {
    const response = await axios.patch(`${SERVICE_URL}/${req.params.id}/sku`, req.body);
    res.json(response.data);
  } catch (err) {
    console.error('❌ SKU Update Proxy Error:', err.message);
    res.status(500).json({ error: 'SKU update failed' });
  }
});



module.exports = router;
