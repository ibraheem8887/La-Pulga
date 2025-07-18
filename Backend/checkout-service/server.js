const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const orderRoute = require('./Routes/orderRoute');
require('dotenv').config()
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);


mongoose.connect(process.env.MONGO_DB_URL, {
}).then(response => {
    console.log('MongoDB Connection Succeeded.')
}).catch(error => {
    console.log('Error in DB connection: ' + error)
});


app.use(cors())
app.use(cors({ origin: 'http://localhost:5173' }));

app.use(express.json())
app.use(express.urlencoded({ extended: false }));

app.use('/orders', orderRoute)

const PORT = process.env.PORT || 4004
app.listen(PORT, () => {
    console.log('App running in port: ' + PORT)
})