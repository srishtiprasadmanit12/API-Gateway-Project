import express from 'express'
import dotenv from 'dotenv'
dotenv.config({path:`./config/${process.env.INSTANCE}.env`})

const app = express()
const port = process.env.PORT || 4000

app.use(express.json())

app.get('/profile', (req, res) => {
    console.log(`Request handled by user-service on port ${port}`);
    res.send({ message: 'User profile fetched successfully!' })
})

app.listen(port, () => console.log(`User Service running on port ${port}`))
