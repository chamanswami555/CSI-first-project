## 📘 E-Commerce Backend Documentation

---

### 📓 Project Overview

This is a full-featured e-commerce backend built with:

* *Node.js* + *Express.js*
* *MongoDB* (Mongoose ORM)
* *JWT Authentication*
* *Modular architecture* (routes, controllers, models)

*Features:*

* User authentication
* Product management (CRUD)
* Shopping cart
* Checkout and order management
* Role-based access (admin/user)

---

### 🚀 Getting Started

#### 🔧 Requirements

* Node.js v18+
* MongoDB instance (Atlas or local)
* Postman or similar for testing
* .env configuration file

#### 📁 Install and Setup

bash
git clone <repository_url>
cd ecommerce-backend
npm install


#### 🛠 Create .env

env
PORT=5000
MONGO_URI=mongodb+srv://<your_mongodb_uri>
JWT_SECRET=your_jwt_secret


#### ▶ Run Server

bash
npm run dev   # Runs with nodemon
# or
npm start     # Runs without nodemon


---

### 🧪 Testing Strategy

| Type        | Tools     | Description                    |
| ----------- | --------- | ------------------------------ |
| Unit        | Jest      | For individual logic units     |
| Integration | Supertest | For route + controller testing |
| Manual      | Postman   | For API testing by testers     |

To run tests:

bash
npm test


---

### 📚 API Documentation

#### 🔐 Auth Routes (/api/auth)

| Method | Route     | Description         | Auth |
| ------ | --------- | ------------------- | ---- |
| POST   | /register | Register a new user | ❌    |
| POST   | /login    | Login with email    | ❌    |
| GET    | /me       | Get logged-in user  | ✅    |

#### 🛍 Product Routes (/api/products)

| Method | Route | Description       | Auth      |
| ------ | ----- | ----------------- | --------- |
| GET    | /     | Get all products  | ❌         |
| GET    | /\:id | Get product by ID | ❌         |
| POST   | /     | Add product       | ✅ (admin) |
| PUT    | /\:id | Update product    | ✅ (admin) |
| DELETE | /\:id | Delete product    | ✅ (admin) |

*Product Schema*

js
{
  name: String,
  description: String,
  price: Number,
  image: String,
  category: String,
  stock: Number
}


#### 🛒 Cart Routes (/api/cart)

| Method | Route   | Description             | Auth |
| ------ | ------- | ----------------------- | ---- |
| GET    | /       | Get current user's cart | ✅    |
| POST   | /add    | Add item to cart        | ✅    |
| POST   | /remove | Remove item from cart   | ✅    |

*Cart Structure*

js
{
  userId,
  items: [
    { productId, quantity }
  ]
}


#### 📦 Order Routes (/api/orders)

| Method | Route     | Description              | Auth |
| ------ | --------- | ------------------------ | ---- |
| POST   | /checkout | Place order from cart    | ✅    |
| GET    | /history  | Get user’s order history | ✅    |

*Order Schema*

js
{
  userId,
  items: [{ productId, quantity }],
  totalAmount,
  shippingAddress,
  status
}


---

### 🧱 Folder Structure Summary


project/
│
├── models/         # Mongoose schemas
├── controllers/    # Logic handlers
├── routes/         # API endpoints
├── middlewares/    # JWT Auth middleware
├── utils/          # Token & helper utils
├── server.js       # Entry point
└── .env            # Environment config


---

### 🔐 Authentication Guide

* Register/Login returns a JWT token.
* Add the token in Authorization header:

http
Authorization: Bearer <your_token>


---

### 🤖 Developer Notes

* Use auth middleware to protect routes.
* Use role property to allow only admins to access product creation/deletion.
* Follow modular architecture for scalability.
* Handle all errors with consistent response structure:

js
{ success: false, message: 'Error message' }


---

### 🔍 Testing Checklist (QA/Testers)

| Feature            | Endpoint           | Expected           |
| ------------------ | ------------------ | ------------------ |
| Register/Login     | /api/auth/*      | JWT token returned |
| Auth middleware    | Protected routes   | 401 without token  |
| Add product        | POST /products   | Only admin allowed |
| Cart functionality | Add/remove items   | Reflects in DB     |
| Checkout           | /orders/checkout | Order created      |
| Order history      | /orders/history  | Accurate results   |

---

### 📦 Sample API Call (Postman)

*POST /api/products*

json
{
  "name": "Wireless Mouse",
  "description": "Ergonomic design",
  "price": 29.99,
  "image": "https://image.url",
  "category": "electronics",
  "stock": 50
}


---

### 📈 Future Improvements (Optional)

* Payment gateway integration
* Inventory alerts
* Admin dashboard for sales/orders
* Search and filters on products
* Coupon system / discounts
