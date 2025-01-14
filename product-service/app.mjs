import express from 'express'

const app = express()
const port = process.env.PORT ||5000

app.use(express.json())

app.get('/list', (req, res) => {
    console.log(`Request handled by product-service on port ${port}`);
    res.send({ message: 'Product list fetched successfully!' })
})

app.listen(port, () => console.log(`Product Service running on port ${port}`))
