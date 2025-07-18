import React, { useState } from 'react';
import DisplayInfo from './Pages/DisplayInfo';
import HomePage from './Pages/HomePage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginForm from './Components/adminComponents/LoginForm';
import AdminDashboard from './Pages/AdminDashboard';
import ProtectedRoute from './Components/adminComponents/ProtectedRoute';
import CheckoutForm from './Components/orderComponents/CheckoutForm';
import OrderDetails from './Pages/OrderDetails';
import Success from './Components/orderComponents/Cancel';
import ConfirmationOrder from './Components/orderComponents/confirmationOrder';
import Cancel from './Components/orderComponents/Cancel';
const App = () => {



  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/displayInfo/:id" element={<DisplayInfo />} />
          <Route path="/detailsForm" element={<CheckoutForm/>} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/orderDetails" element={<OrderDetails />} />
          <Route path="/success" element={<ConfirmationOrder />} />
          <Route path="/cancel" element={<Cancel />} />

          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>





    </div>
  );
};

export default App;
