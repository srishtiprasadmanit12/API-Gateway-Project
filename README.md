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
   git clone https://github.com/yourusername/api-gateway-project.git
   cd api-gateway-project

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

