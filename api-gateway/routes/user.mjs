import express from 'express'
import axios from 'axios'

const router = express.Router()

router.all('/*' ,async(req , res) => {
try{
    const response = await axios({
        method:req.method,
        url:`http://localhost:4000${req.path}`,
        data:req.body
    })
    res.status(response.status).send(response.data)
}
catch(error){
    res.status(error.response?.status || 500).send(error.message)
}
})

export default router