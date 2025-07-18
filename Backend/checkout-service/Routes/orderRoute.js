const express = require('express');
const router = express.Router();

const orderController = require('../Controllers/orderController');

router.post('/', orderController.placeOrder);
router.post('/create-checkout-session', orderController.createCheckoutSession);
router.post('/send-email', orderController.sendEmail);

// router.post('/stripe/confirm', orderController.confirmStripeSession);

// router.get('/:id', orderController.getOrderById);              
// router.get('/email/:email', orderController.getOrdersByEmail); 
// router.get('/', orderController.getAllOrders);                 
// router.patch('/:id/status', orderController.updateOrderStatus); 

module.exports = router;
