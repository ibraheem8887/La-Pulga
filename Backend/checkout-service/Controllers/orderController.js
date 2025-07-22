require('dotenv').config()
const nodemailer = require('nodemailer');

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const Order = require('../Models/Order');

exports.placeOrder = async (req, res) => {
  const { email, fullName, phone, address, orderItems, totalPrice } = req.body;

  if (!email || !fullName || !phone || !address || !orderItems?.length || !totalPrice) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const newOrder = new Order({
      email,
      fullName,
      phone,
      address,
      orderItems,
      totalPrice
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ message: 'Failed to place order', error: error.message });
  }
};




exports.createCheckoutSession = async (req, res) => {
  const { orderItems } = req.body;

  if (!orderItems || !Array.isArray(orderItems)) {
    return res.status(400).json({ message: 'Missing or invalid orderItems' });
  }

  try {
    const lineItems = orderItems.map((product) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: product.name,
          images: Array.isArray(product.images) ? product.images : [product.images],
        },
        unit_amount: Math.round(product.price * 100), // Convert dollars to cents
      },
      quantity: product.quantity,

      adjustable_quantity: {
        enabled: true,
        minimum: 1,
        maximum: 10, // optional limit
      },
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: "http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: "http://localhost:5173/cancel",
    });

    res.json({ id: session.id, url: session.url, lineItems: session.lineItems }); // Return session URL for redirect
  } catch (error) {
    console.error("Stripe session creation error:", error);
    res.status(500).json({ message: 'Failed to create Stripe session', error: error.message });
  }
};


exports.sendEmail = async (req, res) => {
  const { to, text } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
      }
    });

    const mailOptions = {
      from: '"LaPulga" <no-reply@lapulga.com>',
      to,
      subject: "Order Confirmed",
      text
    };

    const info = await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: 'Email sent via Mailtrap', info });
  } catch (error) {
    console.error('Mailtrap send error:', error);
    res.status(500).json({ success: false, message: 'Failed to send email', error });
  }
};