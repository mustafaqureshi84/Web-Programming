require('dotenv').config();
const express = require('express');

const app = express();
let port = 3000;

app.use([express.json()]);

let adminRoutes = require('./routes/adminRoutes');
let userRoutes = require('./routes/userRoutes');
let cartRoutes = require('./routes/cartRoutes');
let feedbackRoutes = require('./routes/feedbackRoutes');
let orderRoutes = require('./routes/orderRoutes');
let productRoutes = require('./routes/productRoutes');
let authentication = require('./middlewares/authentication');

app.use('/admin', adminRoutes);
app.use('/user', userRoutes);
app.use('/product', productRoutes);
app.use('/cart', authentication, cartRoutes);
app.use('/feedback', authentication, feedbackRoutes);
app.use('/order', authentication, orderRoutes);

let start = async () => {
    await require('./models').sequelize.sync().then(() => console.log('Connected to Database')).catch((err) => console.log(`Failed Error : ${err.message}`));
    app.listen(port, () => {
        console.log(`Server is Listening on Port : ${port}`);
    });
};

start();