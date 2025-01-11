const express = require('express')
const axios = require('axios')
const router = express.Router()

router.all('/*', async (req, res) => {
    try {
        const response = await axios({
            method: req.method,
            url: `http://localhost:5000${req.path}`,
            data: req.body,
        })
        res.status(response.status).send(response.data)
    } catch (error) {
        res.status(error.response?.status || 500).send(error.message)
    }
})

module.exports = router
