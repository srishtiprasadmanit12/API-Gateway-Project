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
   ```sh
   git clone https://github.com/srishtiprasadmanit12/API-Gateway-Project.git

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

```
# Terminal 1
INSTANCE=instance1 node user-service/app.mjs

# Terminal 2
INSTANCE=instance2 node user-service/app.mjs

# Terminal 3
INSTANCE=instance3 node user-service/app.mjs
```

**Product Service Instances:**
```
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

#### Authentication
- POST | auth/login
    Authenticate user and return a JWT token.

- Request Body:

```
{
    "username": "testuser",
    "password": "code@123"
}
```

- Response

```
{
  "token": "your-jwt-token"
}
```

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

### Contributing
Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

### License
This project is licensed under the MIT License. See the LICENSE file for details.