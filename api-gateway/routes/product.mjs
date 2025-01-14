import express from 'express';
import axios from 'axios';
import AppError from '../errors.mjs';

const router = express.Router();

const productServiceInstances = [
    'http://localhost:5000',
    'http://localhost:5001',
    'http://localhost:5002'
]


let currentInstanceIndex = 0;

//Round-robin load balancer funciton
const getNextInstance = () => {
    const instance = productServiceInstances[currentInstanceIndex]
    currentInstanceIndex = (currentInstanceIndex + 1) % productServiceInstances.length // similary concept as circular array
    return instance
}


router.all('/*', async (req, res, next) => {
    try {
        const instance = getNextInstance()
        const response = await axios({
            method: req.method,
            url: `${instance}${req.path}`,
            data: req.body,
        })
        console.log(`Selected instance: ${instance}`);
        res.status(response.status).send(response.data);
    } catch (error) {
        if (error.response) {
            // Operational error: API request failed
            next(new AppError(error.message, error.response.status));
        } else {
            // Programmatic error: unexpected error
            next(error);
        }    }
});

export default router;