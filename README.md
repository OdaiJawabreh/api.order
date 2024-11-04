
  

# Microservice-based Application with NestJS

  

This project demonstrates a microservice-based architecture using Nest.js, implementing two separate services for **Product Management** and **Order Management**. The services communicate with each other to manage products and orders through REST and gRPC APIs.

  

## Table of Contents

- [Architecture Overview](#architecture-overview)

- [Services](#services)

- [How to Run](#how-to-run)

- [Database Setup](#database-setup)

- [Swagger API Documentation](#swagger-api-documentation)

- [API Documentation](#api-documentation)

- [Communication Between Services](#communication-between-services)

  

## Architecture Overview

  

This application is composed of two microservices:

1.  **Product Service**: Manages CRUD operations for products.

2.  **Order Service**: Manages CRUD operations for orders and interacts with the product service to associate orders with products and make update in product database through order project.

  

Each service can operate independently and communicates with the other through APIs.

  

## Services

  

### 1. Product Service

Repository: [api.product](https://github.com/OdaiJawabreh/api.product)

  

#### Features:

- Create, read, update, filter ,and delete products.

- List available products.

  

### 2. Order Service

Repository: [api.order](https://github.com/OdaiJawabreh/api.order)

  

#### Features:

- Create, read, update, filter ,and delete orders.

- Associate an order with one or more products by communicating with the product service.

  

## How to Run

  

### Prerequisites:

- Node.js (v16 or higher)
  

### Steps:

  

1. Clone the repositories:

```bash

git clone https://github.com/OdaiJawabreh/api.product.git

git clone https://github.com/OdaiJawabreh/api.order.git

```

  

2. Navigate to each service's directory and install dependencies:

```bash

cd api.product

npm install

  

cd ../api.order

npm install

```

  

3. Start the services:

- You can start each service using `npm run start` or use Docker to containerize them.

```bash

# Start Product Service

cd api.product

npm run start

  

# Start Order Service

cd ../api.order

npm run start

```

  

4. The services will start on the following ports:

- Product Service: `http://localhost:3000`

- Order Service: `http://localhost:3010`
- gRPC  : `http://localhost:50051`



  

## Database Setup

  

Each microservice can use its own database, and you can configure this in the `.env` files located in each service's root directory.

  

### Environment Variables

1.  **Product Service**:

Create a `.env` file inside the `api.product` directory with the following configuration:

```env

DATABASE_HOST=localhost

DATABASE_PORT=5432

DATABASE_USER=your_user

DATABASE_PASSWORD=your_password

DATABASE_NAME=product_db

```

  

2.  **Order Service**:

Create a `.env` file inside the `api.order` directory with the following configuration:

```env

DATABASE_HOST=localhost

DATABASE_PORT=5432

DATABASE_USER=your_user

DATABASE_PASSWORD=your_password

DATABASE_NAME=order_db

```


  

Ensure that your database is up and running, and the credentials in the `.env` files match the database setup.

  

## Swagger API Documentation

  

Both services are configured with Swagger to provide interactive API documentation.

  

1.  **Product Service**: After starting the product service, access Swagger documentation at:

```

http://localhost:3000/docs-product-api

```

  

2.  **Order Service**: After starting the order service, access Swagger documentation at:

```

http://localhost:3010/docs-order-api

```

  

Swagger provides a user-friendly interface to test all available endpoints and view the API schema.

  

### How to Enable Swagger

If not already enabled, you can add Swagger to each service by following these steps:

  

 Install Swagger dependencies:

```bash

npm install --save @nestjs/swagger swagger-ui-express

```

  



  

## API Documentation

  

### Product Service:

-  **GET**  `/products`: List all products with pagination and filter by the name.

-  **POST**  `/products`: Create a new product.

-  **GET**  `/products/:id`: Get a product by ID.

-  **PUT**  `/products/:id`: Update a product by ID.

-  **DELETE**  `/products/:id`: Delete a product by ID.

  

### Order Service:

-  **GET**  `/orders`: List all orders with pagination and filter by the clint code.

-  **POST**  `/orders`: Create a new order. Requires product IDs from the product service.

-  **GET**  `/orders/:id`: Get an order by ID, including the associated products.

-  **PUT**  `/orders/:id`: Update an order by ID.

-  **DELETE**  `/orders/:id`: Delete an order by ID.
-   **POST**  `/orders/create-with-product`: Create a new order, and new product related to the order at the same time.
-   **GET**  `/orders/details/orders`: List all orders with details about the product form product management system.
-   **POST**  `/orders/check-product/orders`:  this will take the product id with how much you need, the we check if there is availble quantity or not, and calculate the total amount order from product service based on product and edit the list of orderItems based on it.

  

## Communication Between Services

  

When creating an order, the order service communicates with the product service to fetch product details. This can be done using:

-  **REST API**: The order service makes HTTP calls to the product service to retrieve product information.

-  **gRPC (optional)**: Alternatively, gRPC can be used for more efficient communication between services.

  

### Example Flow:

-   **POST**  `/orders/create-with-product`: Create a new order, and new product related to the order at the same time.
-   **GET**  `/orders/details/orders`: List all orders with details about the product form product management system.
-   **POST**  `/orders/check-product/orders`:  this will take the product id with how much you need, the we check if there is availble quantity or not, and calculate the total amount order from product service based on product and edit the list of orderItems based on it.

  