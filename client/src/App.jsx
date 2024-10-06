import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from '../src/pages/landing-page';
import './App.css';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import SignupPage from '../src/pages/signup-page';
import LoginPage from './pages/login-page';
import DisplayProducts from './pages/products/display-products';
import AddProducts from './pages/products/add-products';
import ViewProducts from './pages/products/view-product';
import DisplayVendors from './pages/vendors/display-vendors';
import AddVendors from './pages/vendors/add-vendors';
import UpdateVendor from './pages/vendors/update-vendors';
import CustomerOrders from './pages/orders/display-orders';
import ViewOrder from './pages/orders/view-order';
import DisplayProductCategories from './pages/categories/display-categories';
import DisplayInventory from './pages/inventory/display-inventory';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/displayProducts" element={<DisplayProducts />} />
        <Route path="/addProducts" element={<AddProducts />} />
        <Route path="/viewProduct" element={<ViewProducts />} />
        <Route path="/displayVendors" element={<DisplayVendors />} />
        <Route path="/addVendors" element={<AddVendors />} />
        <Route path="/updateVendor" element={<UpdateVendor />} />
        <Route path="/customerOrders" element={<CustomerOrders />} />
        <Route path="/viewOrder" element={<ViewOrder />} />
        <Route
          path="/displayCategories"
          element={<DisplayProductCategories />}
        />
        <Route path="/displayInventory" element={<DisplayInventory />} />
      </Routes>
    </Router>
  );
}

export default App;
