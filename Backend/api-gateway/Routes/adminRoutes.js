const { Router } = require('express');
const axios = require('axios');

const router = Router();
const SERVICE_URL = 'http://admin-service:4002/admin';

router.post('/login', async (req, res) => {
  try {
    const response = await axios.post(`${SERVICE_URL}/login`, req.body);
    res.json(response.data);

  } catch (err) {
    res.status(500).json({ error: 'Login failed. Admin service error.' });
  }
});

module.exports = router;
