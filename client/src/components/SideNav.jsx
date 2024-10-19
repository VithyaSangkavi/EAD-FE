import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import './side-nav.css';

function SideNav() {
  const [homeLabel, setHomeLabel] = useState('Home');
  const [homeRoute, setHomeRoute] = useState('/');
  const [inventoryRoute, setInventoryRoute] = useState('/');
  const [isAdmin, setIsAdmin] = useState(false);
  const [isCsr, setIsCsr] = useState(false);

  const determineHomeLabelAndRoute = () => {
    const storedRoles = JSON.parse(localStorage.getItem('roles')) || [];

    if (storedRoles.includes('Admin')) {
      setHomeLabel('Admin Dashboard');
      setHomeRoute('/admin-dashboard');
      setInventoryRoute('/displayAdminInventory');
      setIsAdmin(true);
    } else if (storedRoles.includes('CSR')) {
      setHomeLabel('CSR Dashboard');
      setHomeRoute('/csr-dashboard');
      setInventoryRoute('/manageOrderStatus'); // Set route for Manage Order Status
      setIsCsr(true);
    } else if (storedRoles.includes('Vendor')) {
      setHomeLabel('Vendor Dashboard');
      setHomeRoute('/vendor-dashboard');
      setInventoryRoute('/displayVendorInventory');
    } else {
      setHomeLabel('Home');
      setHomeRoute('/');
    }
  };

  useEffect(() => {
    determineHomeLabelAndRoute();
  }, []);

  return (
    <div className="side-nav">
      <Nav className="flex-column">
        <Nav.Link
          as={NavLink}
          to={homeRoute}
          exact
          className="nav-link"
          activeClassName="active"
        >
          {homeLabel}
        </Nav.Link>
        {/* Show Manage Products for all roles except CSR */}
        {!isCsr && (
          <Nav.Link
            as={NavLink}
            to="/displayProducts"
            className="nav-link"
            activeClassName="active"
          >
            Manage Products
          </Nav.Link>
        )}
        {/* Show Categories and Vendors only for Admin */}
        {isAdmin && (
          <>
            <Nav.Link
              as={NavLink}
              to="/displayCategories"
              className="nav-link"
              activeClassName="active"
            >
              Manage Categories
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/displayVendors"
              className="nav-link"
              activeClassName="active"
            >
              Manage Vendors
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/displayUsers"
              className="nav-link"
              activeClassName="active"
            >
              Manage Users
            </Nav.Link>

            <Nav.Link
              as={NavLink}
              to="/displayPurchases"
              className="nav-link"
              activeClassName="active"
            >
              Manage Purchases
            </Nav.Link>
          </>
        )}
        {/* Show CSR-specific tabs: Manage Users and Manage Order Status */}
        {isCsr && (
          <>
            <Nav.Link
              as={NavLink}
              to="/displayUsers"
              className="nav-link"
              activeClassName="active"
            >
              Manage Users
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/manageOrderStatus" // New tab for CSR to manage order status
              className="nav-link"
              activeClassName="active"
            >
              Manage Order Status
            </Nav.Link>
          </>
        )}
        {/* Show Orders and Inventory for Admin, CSR, and Vendor */}
        {!isCsr && (
          <Nav.Link
            as={NavLink}
            to="/customerOrders"
            className="nav-link"
            activeClassName="active"
          >
            Manage Orders
          </Nav.Link>
        )}
        {!isCsr && (
          <Nav.Link
            as={NavLink}
            to={inventoryRoute}
            className="nav-link"
            activeClassName="active"
          >
            Manage Inventory
          </Nav.Link>
        )}
      </Nav>
    </div>
  );
}

export default SideNav;