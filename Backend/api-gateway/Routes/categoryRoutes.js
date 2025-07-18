const { Router } = require('express');
const axios = require('axios');
const { requireAuthorization, requireAuthentication } = require('../authMiddleware');

const router = Router();
const SERVICE_URL = 'http://localhost:4001/category';

router.get('/', async (req, res) => {
  try {
    const response = await axios.get(`${SERVICE_URL}`, {
      params: req.query
    });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Category service failed' });
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
  } catch (err) {
    res.status(500).json({ error: 'category service failed' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const response = await axios.get(`${SERVICE_URL}/${req.params.id}`);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'category service failed' });
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
    res.status(500).json({ error: 'category service failed' });
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
    res.status(500).json({ error: 'Category service failed' });
  }
});

module.exports = router;
