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
import CustomerOrders from './pages/orders/display-orders';
import ViewOrder from './pages/orders/view-order';
import DisplayProductCategories from './pages/categories/display-categories';
import DisplayAdminInventory from './pages/inventory/display-admin-inventory';
import DisplayVendorInventory from './pages/inventory/display-vendor-inventory';
import DisplayUsers from './pages/users/display-users';
import AdminDashboard from './pages/dashboards/admin-dashboard';
import VendorDashboard from './pages/dashboards/vendor-dashboard';
import CsrDashboard from './pages/dashboards/csr-dashboard';
import MainLayout from './layouts/MainLayout'; // Import MainLayout

function App() {
  return (
    <Router>
      <Routes>
        {/* Routes without MainLayout */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Routes with MainLayout */}
        <Route
          path="/admin-dashboard"
          element={
            <MainLayout>
              <AdminDashboard />
            </MainLayout>
          }
        />
        <Route
          path="/vendor-dashboard"
          element={
            <MainLayout>
              <VendorDashboard />
            </MainLayout>
          }
        />
        <Route
          path="/csr-dashboard"
          element={
            <MainLayout>
              <CsrDashboard />
            </MainLayout>
          }
        />
        <Route
          path="/displayProducts"
          element={
            <MainLayout>
              <DisplayProducts />
            </MainLayout>
          }
        />
        <Route
          path="/addProducts"
          element={
            <MainLayout>
              <AddProducts />
            </MainLayout>
          }
        />
        <Route
          path="/viewProduct"
          element={
            <MainLayout>
              <ViewProducts />
            </MainLayout>
          }
        />
        <Route
          path="/displayVendors"
          element={
            <MainLayout>
              <DisplayVendors />
            </MainLayout>
          }
        />
        <Route
          path="/addVendors"
          element={
            <MainLayout>
              <AddVendors />
            </MainLayout>
          }
        />
        <Route
          path="/customerOrders"
          element={
            <MainLayout>
              <CustomerOrders />
            </MainLayout>
          }
        />
        <Route
          path="/viewOrder"
          element={
            <MainLayout>
              <ViewOrder />
            </MainLayout>
          }
        />
        <Route
          path="/displayCategories"
          element={
            <MainLayout>
              <DisplayProductCategories />
            </MainLayout>
          }
        />
        <Route
          path="/displayAdminInventory"
          element={
            <MainLayout>
              <DisplayAdminInventory />
            </MainLayout>
          }
        />
        <Route
          path="/displayVendorInventory"
          element={
            <MainLayout>
              <DisplayVendorInventory />
            </MainLayout>
          }
        />
        <Route
          path="/displayUsers"
          element={
            <MainLayout>
              <DisplayUsers />
            </MainLayout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
