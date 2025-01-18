import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import rateLimit from 'express-rate-limit'
import cors from 'cors'
import helmet from 'helmet'

import authenticate from './middleware/auth.mjs'
import userRoutes from './routes/user.mjs'
import productRoutes from './routes/product.mjs'
import authRoutes from './routes/authRoutes.mjs'
import paymentRoutes from './routes/payment.mjs'
import errorHandler from './middleware/errorHandler.mjs'
import AppError from './errors.mjs'

dotenv.config()

const app = express()
const port = process.env.PORT || 3000

// Middleware
app.use(express.json())
app.use(morgan('combined'))
app.use(cors())
app.use(helmet()) // Set security-related HTTP headers

// Rate Limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.',
})
app.use(limiter)

// Routes
app.use('/auth', authRoutes)
app.use('/user', authenticate, userRoutes)
app.use('/product', authenticate, productRoutes)
app.use('/payment', paymentRoutes)
console.log(`-------------paymentRoutes-----------------`)
// Health Check
app.get('/', (req, res) => res.send('API Gateway is running!'))


app.all('*',(req, res, next)=> {
    //Catch any routes that are not found\
    next(new AppError(`Can't find on this server!`, 404))
})

console.log("-----errorHandler------")
app.use(errorHandler)

// Start Server
app.listen(port, () => console.log(`API Gateway running on port ${port}`))
