import express from 'express'

const app = express()
const port = 4000

app.use(express.json())

app.get('/profile', (req, res) => {
    res.send({ message: 'User profile fetched successfully!' })
})

app.listen(port, () => console.log(`User Service running on port ${port}`))
