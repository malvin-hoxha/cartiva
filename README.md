# Cartiva

Cartiva is a full-stack e-commerce web application built with React, Node.js, Express, and MongoDB.

The project focuses on the core workflow of an online store, including authentication, product browsing, shopping cart management, coupons, Stripe Checkout, admin product management, and sales analytics.

## Features

### Authentication

- User signup and login
- JWT access and refresh tokens
- HTTP-only authentication cookies
- Redis-backed refresh token storage
- Automatic access token refresh
- Customer and admin roles
- Protected backend routes

### Storefront

- Product browsing
- Product categories
- Featured products
- Recommended products
- Responsive storefront interface

### Shopping Cart

- Add products to the cart
- Update product quantities
- Remove products
- User carts are stored on the user document in MongoDB
- Automatic subtotal and total calculation

### Coupons

- User-specific coupons
- Coupon validation
- Coupon expiration handling
- Percentage-based discounts
- Reward coupons for qualifying purchases

### Payments

- Stripe Checkout integration
- Server-side product lookup before checkout
- Product prices retrieved from MongoDB when creating Stripe line items
- Payment verification using the Stripe Checkout Session
- Checkout session ownership verification
- Order creation after successful payment
- Duplicate order protection using unique Stripe Session IDs

### Admin Dashboard

- Admin-only access
- Create products
- Delete products
- Toggle featured products
- Upload product images through Cloudinary
- View total users and products
- Track sales and revenue
- View daily sales and revenue data

### Caching

- Redis caching for featured products
- Redis storage for refresh tokens

## Tech Stack

### Frontend

- React
- React Router
- Zustand
- Axios
- Tailwind CSS
- Framer Motion
- Recharts
- Lucide React
- Vite

### Backend

- Node.js
- Express
- MongoDB
- Mongoose
- Redis / Upstash
- JSON Web Tokens
- bcryptjs

### Services

- Stripe
- Cloudinary

## Architecture

Cartiva uses a separated frontend and backend architecture.

```text
React Client
     |
     | REST API
     v
Express Server
     |
     +---- MongoDB / Mongoose
     |
     +---- Redis
     |
     +---- Stripe
     |
     +---- Cloudinary
```

The React application handles the user interface and client-side state.

The Express API contains the application logic and communicates with MongoDB through Mongoose. Redis is used for refresh-token storage and featured-product caching, Stripe handles checkout payments, and Cloudinary stores uploaded product images.

## Checkout Flow

1. The user reviews the shopping cart and starts checkout.
2. The frontend sends the selected product IDs, quantities, and optional coupon code to the backend.
3. The backend retrieves the products from MongoDB and uses the database prices to create the Stripe Checkout Session.
4. Stripe handles the payment through its hosted Checkout page.
5. After payment, Stripe redirects the user back to Cartiva with the Checkout Session ID.
6. The backend retrieves the Stripe Session and verifies both the payment status and session ownership.
7. The order is stored in MongoDB and the coupon logic is processed when applicable.

Each order stores a unique Stripe Session ID to prevent the same Checkout Session from creating duplicate orders.

Cartiva currently uses the browser redirect return flow after Stripe Checkout and does not use Stripe webhooks for order fulfillment.

## Authentication

Cartiva uses JWT-based authentication with access and refresh tokens.

Access tokens expire after 15 minutes, while refresh tokens expire after 7 days.

The access token is used to authenticate protected requests. The refresh token is also stored in Redis.

Both tokens are sent using HTTP-only cookies rather than being directly accessible from frontend JavaScript.

The Axios response interceptor automatically requests a new access token when a protected request returns 401, then retries the original request once.

Backend middleware loads the authenticated user for protected routes, while additional authorization middleware restricts admin functionality.

## Project Structure

```text
cartiva/
├── backend/
│   ├── controllers/
│   ├── lib/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── data/
│   │   ├── lib/
│   │   ├── pages/
│   │   └── stores/
│   └── vite.config.js
│
├── package.json
└── README.md
```

## Running Locally

### 1. Clone the repository

```bash
git clone https://github.com/malvin-hoxha/cartiva.git
cd cartiva
```

### 2. Install backend dependencies

```bash
npm install
```

### 3. Install frontend dependencies

```bash
cd frontend
npm install
cd ..
```

### 4. Configure environment variables

Create a `.env` file in the project root:

```env
PORT=5000
NODE_ENV=development

MONGO_URI=

UPSTASH_REDIS_URL=

ACCESS_TOKEN_SECRET=
REFRESH_TOKEN_SECRET=

STRIPE_SECRET_KEY=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

CLIENT_URL=http://localhost:5173
```

### 5. Start the backend

From the project root:

```bash
npm run dev
```

### 6. Start the frontend

In another terminal:

```bash
cd frontend
npm run dev
```

During development, Vite proxies `/api` requests to the Express server running on `http://localhost:5000`.

## Implementation Highlights

- Product prices are retrieved from MongoDB when constructing Stripe Checkout rather than trusting prices supplied by the browser.
- Refresh tokens are stored in Redis and sent through HTTP-only cookies.
- Authentication and admin authorization are enforced by backend middleware.
- MongoDB aggregation is used to calculate sales and revenue analytics.
- Featured products are cached in Redis.
- Product images are uploaded and stored using Cloudinary.

## Project Status

Cartiva is a portfolio project built to explore full-stack e-commerce development, authentication, payments, caching, database-driven application state, and admin tooling.
