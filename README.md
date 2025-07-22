# E-Commerce Application

A full-stack e-commerce application built with a microservices architecture, featuring a React frontend and Node.js backend services.

## 🏗️ Architecture

This application follows a microservices architecture with the following components:

### Frontend
- **React** with Vite for fast development
- **Redux Toolkit** for state management
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Stripe** integration for payments

### Backend Services
- **API Gateway** - Central entry point for all client requests
- **Admin Service** - Admin panel functionality and user management
- **Products Service** - Product catalog management
- **Category Service** - Product category management
- **Checkout Service** - Order processing and payment handling

### Database
- **MongoDB** - Separate databases for each microservice
- **Docker** containers for database isolation

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- Docker and Docker Compose
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd E-commerce
   ```

2. **Install Frontend Dependencies**
   ```bash
   cd Frontend
   npm install
   ```

3. **Install Backend Dependencies**
   ```bash
   # Install dependencies for each service
   cd Backend/api-gateway && npm install
   cd ../admin-service && npm install
   cd ../products-service && npm install
   cd ../category-service && npm install
   cd ../checkout-service && npm install
   ```

### Running the Application

#### Option 1: Using Docker (Recommended)
```bash
cd Backend
docker-compose up --build
```

This will start all backend services and MongoDB instances.

#### Option 2: Manual Setup
1. **Start MongoDB instances** (you'll need 4 separate instances)
2. **Start each backend service**:
   ```bash
   # In separate terminals
   cd Backend/api-gateway && npm start
   cd Backend/admin-service && npm start
   cd Backend/products-service && npm start
   cd Backend/category-service && npm start
   cd Backend/checkout-service && npm start
   ```

3. **Start the Frontend**:
   ```bash
   cd Frontend
   npm run dev
   ```

## 🔧 Configuration

### Environment Variables
Each service requires specific environment variables. Check the `docker-compose.yml` file for reference:

- **Admin Service**: `MONGO_DB_URL`, `JWT_SECRET`
- **Products Service**: `MONGO_DB_URL`
- **Category Service**: `MONGO_URL`
- **Checkout Service**: `MONGO_DB_URL`, `STRIPE_SECRET_KEY`

### Stripe Configuration
Update the Stripe keys in the checkout service for payment processing.

## 📡 API Endpoints

The API Gateway runs on port `3000` and routes requests to appropriate services:

- **Admin Service**: Port `4002`
- **Products Service**: Port `4000`
- **Category Service**: Port `4001`
- **Checkout Service**: Port `4004`

## 🛠️ Development

### Frontend Development
```bash
cd Frontend
npm run dev        # Start development server
npm run build      # Build for production
npm run lint       # Run ESLint
npm run preview    # Preview production build
```

### Backend Development
Each service can be developed independently. Use `nodemon` for hot reloading during development.

## 🗄️ Database Schema

The application uses separate MongoDB databases:
- `admin-db` - User accounts and admin data
- `product` - Product catalog
- `category` - Product categories
- `order` - Orders and checkout data

## 🔐 Authentication

The application uses JWT (JSON Web Tokens) for authentication, handled by the API Gateway and Admin Service.

## 💳 Payment Processing

Integrated with Stripe for secure payment processing in the checkout service.

## 🐳 Docker Support

All services are containerized with Docker. The `docker-compose.yml` file orchestrates:
- 4 Backend services
- 4 MongoDB instances
- Proper networking between services

## 📦 Key Dependencies

### Frontend
- React 19.1.0
- Redux Toolkit
- Tailwind CSS
- React Router DOM
- Stripe.js
- Axios for API calls

### Backend
- Express.js
- Mongoose (MongoDB ODM)
- JWT for authentication
- bcryptjs for password hashing
- Stripe for payments
- CORS for cross-origin requests

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

