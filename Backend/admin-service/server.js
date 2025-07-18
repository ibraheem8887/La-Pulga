const express = require('express');
const app = express();
const cors = require('cors');
const { default: mongoose } = require('mongoose');
const adminRoutes = require('./Routes/adminRoutes');
require('dotenv').config()

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


app.use('/admin', adminRoutes)

const PORT = process.env.PORT || 4002
app.listen(PORT, () => {
    console.log('App running in port: ' + PORT)
})