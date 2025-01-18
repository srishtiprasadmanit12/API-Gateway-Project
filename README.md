# API Gateway Project

This project is an API Gateway that routes requests to multiple instances of user and product services using a round-robin load balancer. It also includes error handling for both operational and programmatic errors.

## Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Services](#running-the-services)
- [API Endpoints](#api-endpoints)
- [Error Handling](#error-handling)
- [Load Balancing](#load-balancing)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone the repository:
   ```json
   git clone https://github.com/srishtiprasadmanit12/API-Gateway-Project.git
   ```
   cd API\ Gateway\ Project/

2. Install dependencies:

`npm install`

## Configuration
Create configuration files for each instance of the user and product services.

**User Service Configuration**

File: `instance1.env`

```
PORT=4000
```

File: `instance2.env`

```
PORT=4001
```

File: `instance3.env`

```
PORT=4002
```

**Product Service Configuration**

File: `instance1.env`

```
PORT=5000
```

File: `instance2.env`

```
PORT=5001
```

File: `instance3.env`

```
PORT=5002
```

## Running the Services
Use separate terminal windows or a process manager like pm2 to run each instance of the user and product services.

**Using Separate Terminal Windows**

**User Service Instances:**

```json
# Terminal 1
INSTANCE=instance1 node user-service/app.mjs

# Terminal 2
INSTANCE=instance2 node user-service/app.mjs

# Terminal 3
INSTANCE=instance3 node user-service/app.mjs
```

**Product Service Instances:**
```json
# Terminal 1
INSTANCE=instance1 node product-service/app.mjs

# Terminal 2
INSTANCE=instance2 node product-service/app.mjs

# Terminal 3
INSTANCE=instance3 node product-service/app.mjs
```

**Using pm2**

Install `pm2` if not already installed:

```
npm install -g pm2
```

Start each instance with `pm2`:

```
# User Service Instances
pm2 start user-service/app.mjs --name user-instance1 --env instance1
pm2 start user-service/app.mjs --name user-instance2 --env instance2
pm2 start user-service/app.mjs --name user-instance3 --env instance3

# Product Service Instances
pm2 start product-service/app.mjs --name product-instance1 --env instance1
pm2 start product-service/app.mjs --name product-instance2 --env instance2
pm2 start product-service/app.mjs --name product-instance3 --env instance3
```

## API Endpoints

#### User Service
-  GET | user/profile 
   Fetch user profile 

#### Product Service
- GET | product/list
    Fetch product details.

#### Payment Service
- POST | payment/create-customer
Create a new customer.

- Request Body
```
{
    "name":"Srishti Prasad",
    "email":"prasad@gmail.com"
}
```
- Response Body
```
{
    "id": "cus_RbmNjnVZQt5d50",
    "object": "customer",
    "address": null,
    "balance": 0,
    "created": 1737194404,
    "currency": null,
    "default_source": null,
    "delinquent": false,
    "description": null,
    "discount": null,
    "email": "prasad@gmail.com",
    "invoice_prefix": "F997F344",
    "invoice_settings": {
        "custom_fields": null,
        "default_payment_method": null,
        "footer": null,
        "rendering_options": null
    },
    "livemode": false,
    "metadata": {},
    "name": "Srishti Prasad",
    "next_invoice_sequence": 1,
    "phone": null,
    "preferred_locales": [],
    "shipping": null,
    "tax_exempt": "none",
    "test_clock": null
}
```


- POST | payment/checkout
Initiate payment checkout.

- Request Body
```
{
    "currency": "usd",
    "product_name": "mutual fund",
    "amount": "2000"
}
```

- Response Body
```
{
    "id": "cs_test_a1107bEeXECStiTjkPt31vqj5GgHOvsU28xFe8p6gvFLLtuZwMjXIbLjLN",
    "object": "checkout.session",
    "adaptive_pricing": {
        "enabled": false
    },
    "after_expiration": null,
    "allow_promotion_codes": null,
    "amount_subtotal": 2000,
    "amount_total": 2000,
    "automatic_tax": {
        "enabled": false,
        "liability": null,
        "status": null
    },
    "billing_address_collection": null,
    "cancel_url": "https://google.com",
    "client_reference_id": null,
    "client_secret": null,
    "consent": null,
    "consent_collection": null,
    "created": 1737194475,
    "currency": "usd",
    "currency_conversion": null,
    "custom_fields": [],
    "custom_text": {
        "after_submit": null,
        "shipping_address": null,
        "submit": null,
        "terms_of_service_acceptance": null
    },
    "customer": null,
    "customer_creation": "if_required",
    "customer_details": null,
    "customer_email": null,
    "expires_at": 1737280875,
    "invoice": null,
    "invoice_creation": {
        "enabled": false,
        "invoice_data": {
            "account_tax_ids": null,
            "custom_fields": null,
            "description": null,
            "footer": null,
            "issuer": null,
            "metadata": {},
            "rendering_options": null
        }
    },
    "livemode": false,
    "locale": null,
    "metadata": {},
    "mode": "payment",
    "payment_intent": null,
    "payment_link": null,
    "payment_method_collection": "if_required",
    "payment_method_configuration_details": {
        "id": "pmc_1Qhu4XKcLFexGjFIfaWzvjVj",
        "parent": null
    },
    "payment_method_options": {
        "card": {
            "request_three_d_secure": "automatic"
        }
    },
    "payment_method_types": [
        "card",
        "klarna",
        "link",
        "cashapp",
        "amazon_pay"
    ],
    "payment_status": "unpaid",
    "phone_number_collection": {
        "enabled": false
    },
    "recovered_from": null,
    "saved_payment_method_options": null,
    "setup_intent": null,
    "shipping_address_collection": null,
    "shipping_cost": null,
    "shipping_details": null,
    "shipping_options": [],
    "status": "open",
    "submit_type": null,
    "subscription": null,
    "success_url": "https://google.com",
    "total_details": {
        "amount_discount": 0,
        "amount_shipping": 0,
        "amount_tax": 0
    },
    "ui_mode": "hosted",
    "url": "https://checkout.stripe.com/c/pay/cs_test_a1107bEeXECStiTjkPt31vqj5GgHOvsU28xFe8p6gvFLLtuZwMjXIbLjLN#fidkdWxOYHwnPyd1blpxYHZxWjA0VG1wMTdOZklDYH1Cb0NMMl9QQmtgd0ZdS2BIQzYzPG5XQ2ZzS25WTVY3R1JfSDZDcGBnMWBtfG5AVGBkYEhTaDc9aTU0dV9AbGtCZGhwRjFvRDZDTDxpNTV9SHRybUZLQScpJ2N3amhWYHdzYHcnP3F3cGApJ2lkfGpwcVF8dWAnPyd2bGtiaWBabHFgaCcpJ2BrZGdpYFVpZGZgbWppYWB3dic%2FcXdwYHgl"
}
```

The `url` generated here is checkout payment link generated for stripe.

#### Authentication
- POST | auth/login
    Authenticate user and return a JWT token.

- Request Body:

```json
{
    "username": "testuser",
    "password": "code@123"
}
```

- Response

```json
{
  "token": "your-jwt-token"
}
```

### Authentication
Both the user and product routes are protected by an authentication middleware that requires a valid JWT token in the Authorization header.

Example Request with Authorization Header

To fetch product-service
`curl -X GET "http://localhost:3000/product/list" -H "Authorization: Bearer your-jwt-token"`

To fetch user-service
``curl -X GET "http://localhost:3000/user/profile" -H "Authorization: Bearer your-jwt-token"``

### Error Handling
The project includes centralized error handling middleware to catch and process both operational and programmatic errors.

### Operational Errors
Operational errors are expected and can be handled gracefully. For example, invalid user input or failed API requests.

### Programmatic Errors
Programmatic errors are unexpected and indicate bugs in the code. These errors are logged for debugging purposes, and a generic error message is sent to the client.

### Load Balancing
The project uses a round-robin load balancer to distribute requests across multiple instances of the user and product services.

### Round-Robin Load Balancer
The round-robin load balancer cycles through the list of service instances for each request, ensuring even distribution of requests.

###  Overview of Payment Integration
The payment integration in this project is powered by Stripe, enabling secure and seamless payment processing. It includes creating customers, initiating payment checkouts, and handling different payment statuses.

###  Steps to Set Up Payment Integration
Provide a clear step-by-step guide for setting up the payment integration locally.

- Create a Stripe Account: Sign up for a free account at Stripe.
- Obtain API Keys: Navigate to the Developers > API Keys section on the Stripe dashboard and copy your Publishable Key and Secret Key.
- Set Up Environment Variables:
Add the API keys to your .env file:

### Testing Payment Integration
Provide instructions on how to test the payment integration using Stripe’s test mode and sample card details.

Example:

1. Enable test mode in your Stripe dashboard.

2. Use the following test card details to simulate payments:

- Card Number: 4242 4242 4242 4242 (this is test card number provided by stripe for transaction)
- Expiration Date: Any future date
- CVC: Any 3-digit number

3. Monitor events and responses in your Stripe dashboard.


### Contributing
Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

### License
This project is licensed under the MIT License. See the LICENSE file for details.