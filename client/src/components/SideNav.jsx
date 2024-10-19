import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import './side-nav.css';

function SideNav() {
  const [homeLabel, setHomeLabel] = useState('Home');
  const [homeRoute, setHomeRoute] = useState('/');
  const [inventoryRoute, setInventoryRoute] = useState('/');
  const [isAdminOrCSR, setIsAdminOrCSR] = useState(false); // Track Admin or CSR role

  const determineHomeLabelAndRoute = () => {
    const storedRoles = JSON.parse(localStorage.getItem('roles')) || [];

    if (storedRoles.includes('Admin') || storedRoles.includes('CSR')) {
      setHomeLabel('Admin Dashboard');
      setHomeRoute('/admin-dashboard');
      setInventoryRoute('/displayAdminInventory');
      setIsAdminOrCSR(true);
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
        {/* Show Manage Products for all roles */}
        <Nav.Link
          as={NavLink}
          to="/displayProducts"
          className="nav-link"
          activeClassName="active"
        >
          Manage Products
        </Nav.Link>
        {/* Show Categories and Vendors only for Admin/CSR */}
        {isAdminOrCSR && (
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
          </>
        )}
        {/* Show Orders and Inventory for both Admin, CSR, and Vendor */}
        <Nav.Link
          as={NavLink}
          to="/customerOrders"
          className="nav-link"
          activeClassName="active"
        >
          Manage Orders
        </Nav.Link>
        <Nav.Link
          as={NavLink}
          to="/displayPurchases"
          className="nav-link"
          activeClassName="active"
        >
          Manage Purchases
        </Nav.Link>

        <Nav.Link
          as={NavLink}
          to={inventoryRoute}
          className="nav-link"
          activeClassName="active"
        >
          Manage Inventory
        </Nav.Link>
      </Nav>
    </div>
  );
}

export default SideNav;
