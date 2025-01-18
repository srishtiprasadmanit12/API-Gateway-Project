import Stripe from 'stripe';
import express from 'express'
const app = express()
app.use(express.json())
import dotenv from 'dotenv'
dotenv.config()
const stripe = new Stripe(process.env.STRIPE_SECRET)


app.post('/create-checkout-session', async (req, res) => {
  const { currency, product_name, amount } = req.body
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data:{
            currency: currency,
            product_data:{
                name:product_name
            },
            unit_amount: amount
        },
        quantity: 1
      },
    ],
    mode: 'payment',
    success_url: `https://google.com`,
    cancel_url: `https://google.com`,
})
res.status(200).send(session)
res.redirect(303, session.url)
})


app.post('/create-customer', async (req, res) => {
const {name,email} = req.body
console.log(name,email)
const customer = await stripe.customers.create({
  name,
  email,
})
console.log("customer",customer)
res.status(201).send(customer)
})


app.listen(6000, () => console.log('Running on port 6000'))