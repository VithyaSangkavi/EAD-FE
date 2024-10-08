import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import './admin-header.css';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faBell } from '@fortawesome/free-solid-svg-icons';

function AdminHeader() {
  const navigate = useNavigate();
  const [lowStockCount, setLowStockCount] = useState(0); // Low stock count state

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:5296/api/Auth/logout');

      localStorage.removeItem('token');
      localStorage.removeItem('user');

      navigate('/login');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  // Function to fetch low stock alerts
  const fetchLowStockAlerts = async () => {
    try {
      const response = await axios.get(
        'http://localhost:5296/api/inventory/low-stock-alerts'
      );
      const lowStockItems = response.data; // Assuming the API returns an array of low stock items
      setLowStockCount(lowStockItems.length); // Set the count of low stock items
    } catch (error) {
      console.error('Error fetching low stock alerts:', error);
    }
  };

  useEffect(() => {
    fetchLowStockAlerts(); // Fetch low stock items on component mount
  }, []);

  return (
    <>
      <Navbar
        className="custom-navbar"
        bg="info"
        data-bs-theme="light"
        fixed="top"
      >
        <Container>
          <Nav className="me-auto">
            <Nav.Link
              as={NavLink}
              to="/"
              exact
              className="nav-link"
              activeClassName="active"
            >
              Home
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/displayProducts"
              className="nav-link"
              activeClassName="active"
            >
              Products
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/displayCategories"
              className="nav-link"
              activeClassName="active"
            >
              Categories
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/customerOrders"
              className="nav-link"
              activeClassName="active"
            >
              Orders
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/displayVendors"
              className="nav-link"
              activeClassName="active"
            >
              Vendors
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/displayInventory"
              className="nav-link"
              activeClassName="active"
            >
              Inventory
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/displayUsers"
              className="nav-link"
              activeClassName="active"
            >
              Manage Users
            </Nav.Link>
          </Nav>

          <Nav className="ms-auto d-flex align-items-center">
            {/* Notification Bell Icon with Badge */}
            <Nav.Link
              onClick={fetchLowStockAlerts}
              className="position-relative"
            >
              <FontAwesomeIcon icon={faBell} size="lg" />
              {lowStockCount > 0 && (
                <Badge
                  bg="danger"
                  pill
                  className="position-absolute top-0 start-100 translate-middle p-2"
                >
                  {lowStockCount}
                </Badge>
              )}
            </Nav.Link>

            {/* Logout Button */}
            <Button variant="danger" onClick={handleLogout} className="ms-3">
              <FontAwesomeIcon icon={faSignOutAlt} className="me-2" />
              Logout
            </Button>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default AdminHeader;
