# 🛒 Nxt Trendz – E-Commerce Web Application

A modern **E-Commerce storefront** built with **React**, demonstrating real-world features such as authentication, protected routes, product listing with filters, product details, and cart management.

🔗 **Live Demo:** https://nxt-trendz-zk08.onrender.com
📂 **Source Code:** `./src`

---

## ✨ Features

- 🔐 JWT-based Authentication (Protected Routes)
- 🛍️ Product Listing with Search, Filters & Sorting
- 📄 Product Details Page (Dynamic Routing)
- 🛒 Shopping Cart using React Context API
- 💾 Cart Persistence using Local Storage
- ⏳ Loading & Error Handling
- 📱 Fully Responsive UI

---

## 🔑 Demo Credentials

Authentication is required to access protected pages (Products, Cart, Product Details).

Username: rahul
Password: rahul@2021

---

## 🧱 Tech Stack

- **Frontend:** React.js, JavaScript, CSS, Bootstrap  
- **Routing:** React Router DOM (v6)  
- **State Management:** Context API  
- **Authentication:** JWT (stored using cookies via `js-cookie`)  
- **API Handling:** Fetch API  
- **UI Utilities:** react-loader-spinner, react-icons  

---

## 🏗️ Application Architecture (High Level)

### Authentication
- Login API: `POST https://apis.ccbp.in/login`
- JWT stored as `jwt_token` cookie
- `ProtectedRoute` restricts unauthenticated access

### Product Data
- Products API: `GET https://apis.ccbp.in/products`
- Supports query parameters:
  - `sort_by`
  - `category`
  - `title_search`
  - `rating`

### Cart Management
- Global cart state via `CartContext`
- Synced with `localStorage` (`myCartList`)
- Supports add, remove, increment, and decrement operations

---

## 📁 Project Structure

src/ ├── index.js          # App entry point ├── App.js            # Routing & Cart Context provider ├── context/ │   └── CartContext.js ├── components/ │   ├── LoginForm │   ├── Header │   ├── Home │   ├── Products │   ├── ProductItemDetails │   ├── Cart │   ├── FiltersGroup │   └── ProtectedRoute

 ---

## 🚀 Getting Started (Local Setup)

### Prerequisites
- Node.js (v16 or higher)
- npm

### Installation
```bash
npm install

Run Development Server
npm start
Open: http://localhost:3000
Build for Production
npm run build

##🔒 Security Notes
JWT is stored in cookies for authentication.
For production-grade systems:
Use HttpOnly & Secure cookies
Enforce HTTPS
Add server-side validation & rate limiting
🧪 Testing
This project uses the standard Create React App testing setup.

📌 Learning Outcomes
Implemented real-world authentication & authorization
Built scalable React Context-based state management
Practiced API integration with query parameters
Improved understanding of protected routing & persistence
👨‍💻 Author
Mohammad Suhail Ahamed
GitHub: Md-suhail07-code
