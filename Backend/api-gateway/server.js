const express = require('express');
const cors = require('cors');

const app = express();

const adminRoutes = require('./Routes/adminRoutes');
const categoryRoutes = require('./Routes/categoryRoutes');
const productsRoutes = require('./Routes/productsRoutes');
const ordersRoutes = require('./Routes/orderRoutes');


app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/admin', adminRoutes);
app.use('/category', categoryRoutes);
app.use('/products', productsRoutes);
app.use('/orders', ordersRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API Gateway running on port` +PORT);
});
