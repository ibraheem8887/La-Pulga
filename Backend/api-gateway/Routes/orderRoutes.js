const express = require('express');
const router = express.Router();
const axios = require('axios');
const { requireAuthorization, requireAuthentication } = require('../authMiddleware');

const SERVICE_URL = 'http://checkout-service:4004/orders';




router.post('/create-checkout-session', async (req, res) => {
  try {
    const response = await axios.post(`${SERVICE_URL}/create-checkout-session`, req.body);
    res.json(response.data);
  }
  catch (err) {
    console.error('❌ Proxy Error:', {
      status: err.response?.status,
      data: err.response?.data,
      message: err.message,
    });
    res.status(500).json({ error: 'Order service failed' });
  }

});

router.post('/send-email', async (req, res) => {
  try {
    const response = await axios.post(`${SERVICE_URL}/send-email`, req.body);
    res.json(response.data);
  }
  catch (err) {
    console.error('❌ Proxy Error:', {
      status: err.response?.status,
      data: err.response?.data,
      message: err.message,
    });
    res.status(500).json({ error: 'Order service failed' });
  }

});



router.post('/', async (req, res) => {
  try {
    const response = await axios.post(`${SERVICE_URL}`, req.body);
    res.json(response.data);
  }
  catch (err) {
    console.error('❌ Proxy Error:', {
      status: err.response?.status,
      data: err.response?.data,
      message: err.message,
    });
    res.status(500).json({ error: 'Order service failed' });
  }

});

// router.post('/upload-images', requireAuthorization, requireAuthentication, upload.array('images', 5), async (req, res) => {
//   try {
//     const formData = new FormData();

//     req.files.forEach((file) => {
//       formData.append('images', file.buffer, {
//         filename: file.originalname,
//         contentType: file.mimetype,
//       });
//     });

//     const response = await axios.post(`${SERVICE_URL}/upload-images`, formData, {
//       headers: {
//         ...formData.getHeaders(),
//         Authorization: req.headers.authorization,
//       },
//     });

//     res.json(response.data);
//   } catch (err) {
//     console.error('❌ Image Upload Proxy Error:', err.message);
//     res.status(500).json({ error: 'Image upload failed' });
//   }
// });


// router.get('/:id', async (req, res) => {
//   try {
//     const response = await axios.get(`${SERVICE_URL}/${req.params.id}`);
//     res.json(response.data);
//   } catch (err) {
//     res.status(500).json({ error: 'Product service failed' });
//   }
// });

// router.put('/:id', requireAuthorization, requireAuthentication, async (req, res) => {
//   try {
//     const response = await axios.put(`${SERVICE_URL}/${req.params.id}`, req.body, {
//       headers: {
//         Authorization: req.headers.authorization
//       }
//     });
//     res.json(response.data);
//   } catch (err) {
//     res.status(500).json({ error: 'Product service failed' });
//   }
// });

// router.delete('/:id', requireAuthorization, requireAuthentication, async (req, res) => {
//   try {
//     const response = await axios.delete(`${SERVICE_URL}/${req.params.id}`, {
//       headers: {
//         Authorization: req.headers.authorization
//       }
//     });
//     res.json(response.data);
//   } catch (err) {
//     res.status(500).json({ error: 'Product service failed' });
//   }
// });

module.exports = router;
