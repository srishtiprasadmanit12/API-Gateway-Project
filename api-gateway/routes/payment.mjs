import express from 'express';
import axios from 'axios';

const router = express.Router();
const app = express()
app.use(express.json())

const PAYMENT_SERVICE_URL = 'http://localhost:6000';

router.all('/create-customer', async (req, res) => {
    try {
        const response = await axios({
            method: req.method,
            url: `${PAYMENT_SERVICE_URL}/create-customer`,
            data: req.body
        })
        res.status(response.status).send(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({ error: error.message });
    }
});

router.all('/checkout', async (req, res) => {
    try {
        const response = await axios({
            method: req.method,
            url: `${PAYMENT_SERVICE_URL}/create-checkout-session`,
            data: req.body
        })
        res.status(response.status).send(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({ error: error.message });
    }
})
export default router;