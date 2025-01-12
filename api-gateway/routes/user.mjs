import express from 'express'
import axios from 'axios'
import AppError from '../errors.mjs'


const router = express.Router()

router.all('/*' ,async(req , res,next) => {
try{
    const response = await axios({
        method:req.method,
        url:`http://localhost:4000${req.path}`,
        data:req.body
    })
    res.status(response.status).send(response.data)
}
catch(error){
    if (error.response) {
        // Operational error: API request failed
        next(new AppError(error.message, error.response.status));
    } else {
        // Programmatic error: unexpected error
        next(error);
    }}
})

export default router
