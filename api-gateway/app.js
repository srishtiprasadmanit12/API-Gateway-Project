const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const { authenticate } = require('./middleware/auth');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(morgan('combined'));
app.use(cors());

// Rate Limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.',
});
app.use(limiter);

// Routes
const userRoutes = require('./routes/user');
const productRoutes = require('./routes/product');
app.use('/user', authenticate, userRoutes);
app.use('/product', authenticate, productRoutes);

// Health Check
app.get('/', (req, res) => res.send('API Gateway is running!'));

// Start Server
app.listen(port, () => console.log(`API Gateway running on port ${port}`));
