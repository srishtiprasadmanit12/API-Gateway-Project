import express from 'express'
import axios from 'axios'
import AppError from '../errors.mjs'


const router = express.Router()

const userSeriveInstances = [
    'http://localhost:4000',
    'http://localhost:4001',
    'http://localhost:4002'
]

let currentInstanceIndex = 0

//Round-Robin load balancer function

const getNextInstance = () => {
    const instance = userSeriveInstances[currentInstanceIndex]
    currentInstanceIndex = (currentInstanceIndex + 1) % userSeriveInstances.length
    return instance
}

router.all('/*' ,async(req , res,next) => {
try{
    const instance = getNextInstance()
    const response = await axios({
        method:req.method,
        url:`${instance}${req.path}`,
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
