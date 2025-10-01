# Veg E-Commerce

This is a full-stack e-commerce application for selling vegetables. It includes a React-based front-end and a Node.js/Express back-end.

## Technologies Used

**Front-End:**

*   React
*   Vite
*   React Router
*   Zustand for state management
*   Axios for API requests
*   Tailwind CSS for styling
*   React Icons
*   React Hot Toast for notifications

**Back-End:**

*   Node.js
*   Express.js
*   MongoDB with Mongoose
*   JSON Web Tokens (JWT) for authentication
*   bcryptjs for password hashing
*   CORS
*   Dotenv for environment variables

## Features

*   User authentication (signup, login)
*   Admin dashboard for managing users, products, and orders
*   Product listing, viewing, and searching
*   Shopping cart functionality
*   Order placement and history
*   Product recommendations
*   Admin and protected routes

## Getting Started

### Prerequisites

*   Node.js (v14 or later)
*   npm
*   MongoDB

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/veg-e-commerce.git
    cd veg-e-commerce
    ```

2.  **Install front-end dependencies:**

    ```bash
    cd client
    npm install
    ```

3.  **Install back-end dependencies:**

    ```bash
    cd ../server
    npm install
    ```

4.  **Set up environment variables:**

    Create a `.env` file in the `server` directory and add the following:

    ```
    MONGO_URI=<your_mongodb_connection_string>
    JWT_SECRET=<your_jwt_secret>
    ```

5.  **Start the development servers:**

    *   **Front-End:** In the `client` directory, run:

        ```bash
        npm run dev
        ```

    *   **Back-End:** In the `server` directory, run:

        ```bash
        npm run dev
        ```

The front-end will be available at `http://localhost:5173` and the back-end at `http://localhost:5000`.

## API Endpoints

### User Routes (`/api/users`)

*   `POST /signup`: Register a new user.
*   `POST /login`: Log in a user.
*   `GET /me`: Get the current user's profile.
*   `GET /profile`: Get the current user's profile.
*   `GET /`: (Admin) Get all users.
*   `GET /:id`: (Admin) Get a user by ID.
*   `PUT /:id`: (Admin) Update a user.
*   `DELETE /:id`: (Admin) Delete a user.

### Product Routes (`/api/products`)

*   `POST /`: (Admin) Create a new product.
*   `GET /`: Get all products.
*   `GET /admin`: (Admin) Get all products.
*   `GET /:id`: Get a product by ID.
*   `PUT /:id`: (Admin) Update a product.
*   `DELETE /:id`: (Admin) Delete a product.
*   `GET /:pId/recommendations`: Get recommended products.

### Cart Routes (`/api/cart`)

*   `GET /`: Get the user's cart.
*   `POST /`: Add an item to the cart.
*   `DELETE /:productId`: Remove an item from the cart.

### Order Routes (`/api/orders`)

*   `POST /`: Create a new order.
*   `GET /`: (Admin) Get all orders.
*   `GET /myorders`: Get the current user's orders.
*   `GET /:id`: Get an order by ID.
*   `PUT /:id`: (Admin) Update an order.
*   `DELETE /:id`: (Admin) Delete an order.

## Folder Structure

```
veg-e-commerce/
├── client/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── store/
│   │   └── utils/
│   ├── package.json
│   └── vite.config.js
└── server/
    ├── src/
    │   ├── controllers/
    │   ├── middleware/
    │   ├── models/
    │   ├── routes/
    │   └── utils/
    ├── package.json
    └── .env (create this file)
```
