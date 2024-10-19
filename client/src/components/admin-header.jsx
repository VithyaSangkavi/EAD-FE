import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import axios from 'axios';
import { faShoppingBasket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faBell } from '@fortawesome/free-solid-svg-icons';
import SideNav from './SideNav';
import './admin-header.css';

function AdminHeader() {
  const navigate = useNavigate();
  const [lowStockCount, setLowStockCount] = useState(0);

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:5296/api/Auth/logout');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('roles');
      navigate('/login');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const fetchLowStockAlerts = async () => {
    try {
      const response = await axios.get(
        'http://localhost:5296/api/inventory/low-stock-alerts'
      );
      const lowStockItems = response.data;
      setLowStockCount(lowStockItems.length);
    } catch (error) {
      console.error('Error fetching low stock alerts:', error);
    }
  };

  useEffect(() => {
    fetchLowStockAlerts();
  }, []);

  return (
    <div className="layout">
      {/* Sidebar */}
      <SideNav />

      {/* Top Navbar */}
      <Navbar
        className="custom-navbar"
        bg="info"
        data-bs-theme="light"
        fixed="top"
      >
        <div className="container-fluid">
          {/* Empty Nav to push content to the right */}
          <Nav className="me-auto">
            <span className="navbar-brand">
              <FontAwesomeIcon style={{marginRight: '10px'}} icon={faShoppingBasket} /> ShopX
            </span>

            <span className="navbar-small">-----  Made Your Shopping Easy  -----</span>
          </Nav>

          {/* Right side: Notifications and Logout */}
          <Nav className="ms-auto d-flex align-items-center">
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

            <Button variant="danger" onClick={handleLogout} className="ms-3">
              <FontAwesomeIcon icon={faSignOutAlt} className="me-2" />
              Logout
            </Button>
          </Nav>
        </div>
      </Navbar>
    </div>
  );
}

export default AdminHeader;
