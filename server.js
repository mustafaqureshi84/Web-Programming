require('dotenv').config();
const express = require('express');

const app = express();
let port = 3000;

app.use([express.json(), express.static('./public')]);

let adminRoutes = require('./routes/adminRoutes');
let userRoutes = require('./routes/userRoutes');
let cartRoutes = require('./routes/cartRoutes');
let feedbackRoutes = require('./routes/feedbackRoutes');
let orderRoutes = require('./routes/orderRoutes');
let productRoutes = require('./routes/productRoutes');
let authentication = require('./middlewares/authentication');
let notFound = require('./middlewares/notFound');

app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/product', productRoutes);
app.use('/api/v1/cart', authentication, cartRoutes);
app.use('/api/v1/feedback', authentication, feedbackRoutes);
app.use('/api/v1/order', authentication, orderRoutes);
app.use(notFound);

let start = async () => {
    await require('./models').sequelize.sync().then(() => console.log('Connected to Database')).catch((err) => console.log(`Failed Error : ${err.message}`));
    app.listen(port, () => {
        console.log(`Server is Listening on Port : ${port}`);
    });
};

start();