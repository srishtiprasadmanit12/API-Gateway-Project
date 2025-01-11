const express = require('express')
const app = express()
const port = 5000

app.use(express.json())

app.get('/list', (req, res) => {
    res.send({ message: 'Product list fetched successfully!' })
})

app.listen(port, () => console.log(`Product Service running on port ${port}`))
