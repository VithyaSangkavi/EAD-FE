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
import { Dropdown } from 'react-bootstrap'; // Import Dropdown for notifications

function AdminHeader() {
  const navigate = useNavigate();
  const [lowStockProducts, setLowStockProducts] = useState([]); // Track low stock products
  const [showDropdown, setShowDropdown] = useState(false); // To toggle the dropdown

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

  // Fetch low stock alerts
  const fetchLowStockAlerts = async () => {
    try {
      const token = localStorage.getItem('token');
      const userEmail = localStorage.getItem('userEmail');
      const storedRoles = JSON.parse(localStorage.getItem('roles')) || [];

      let apiUrl = '';
      if (storedRoles.includes('Admin') || storedRoles.includes('CSR')) {
        apiUrl = 'http://localhost:5296/api/Inventory/admin/products';
      } else if (storedRoles.includes('Vendor')) {
        apiUrl = `http://localhost:5296/api/Inventory/user/${userEmail}/products`;
      }

      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Filter low stock products
      const lowStockItems = [];
      Object.entries(response.data).forEach(([categoryName, categoryInfo]) => {
        categoryInfo.products.forEach((product) => {
          if (product.stockQuantity < 10) {
            lowStockItems.push({
              name: product.name,
              category: categoryName,
              stockQuantity: product.stockQuantity,
              timeStamp: new Date().toLocaleString(), // Add timestamp
            });
          }
        });
      });

      setLowStockProducts(lowStockItems); // Set low stock products
    } catch (error) {
      console.error('Error fetching low stock alerts:', error);
    }
  };

  useEffect(() => {
    fetchLowStockAlerts();
  }, []);

  // Handle marking notifications as read
  const markAsRead = (index) => {
    const updatedProducts = [...lowStockProducts];
    updatedProducts.splice(index, 1); // Remove the read notification
    setLowStockProducts(updatedProducts);
  };

  // Redirect to the full notifications page
  const handleViewFullNotification = () => {
    navigate('/vendor-dashboard'); // Redirect to a full notifications page (create this page)
  };

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
          <Nav className="me-auto">
            <span className="navbar-brand">
              <FontAwesomeIcon style={{marginRight: '10px'}} icon={faShoppingBasket} /> ShopX
            </span>

            <span className="navbar-small">-----  Made Your Shopping Easy  -----</span>
          </Nav>

          {/* Right side: Notifications and Logout */}
          <Nav className="ms-auto d-flex align-items-center">
            {/* Notification Bell with Dropdown */}
            <Dropdown
              show={showDropdown}
              onToggle={() => setShowDropdown(!showDropdown)}
            >
              <Dropdown.Toggle as={Nav.Link} id="dropdown-custom-components">
                <FontAwesomeIcon icon={faBell} size="lg" />
                {lowStockProducts.length > 0 && (
                  <Badge
                    bg="danger"
                    pill
                    className="position-absolute top-0 start-100 translate-middle p-2"
                  >
                    {lowStockProducts.length}
                  </Badge>
                )}
              </Dropdown.Toggle>

              <Dropdown.Menu align="end">
                <Dropdown.Header className="notification-text">
                  Notifications
                </Dropdown.Header>
                {lowStockProducts.length > 0 ? (
                  lowStockProducts.map((product, index) => (
                    <Dropdown.Item key={index} className="notification-item">
                      <div>
                        <strong>Low stock alert for {product.name}</strong> (
                        {product.stockQuantity} units left)
                        <br />
                        <small>{product.timeStamp}</small>
                      </div>
                      <div>
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => markAsRead(index)}
                        >
                          Mark as Read
                        </Button>
                      </div>
                    </Dropdown.Item>
                  ))
                ) : (
                  <Dropdown.Item>No low stock alerts</Dropdown.Item>
                )}
                {lowStockProducts.length > 0 && <Dropdown.Divider />}
                <Dropdown.Item
                  className="notification-text"
                  onClick={handleViewFullNotification}
                >
                  View Full Notifications
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Button variant="danger" onClick={handleLogout} className="ms-5">
              <FontAwesomeIcon icon={faSignOutAlt} className="me-3" />
              Logout
            </Button>
          </Nav>
        </div>
      </Navbar>
    </div>
  );
}

export default AdminHeader;
