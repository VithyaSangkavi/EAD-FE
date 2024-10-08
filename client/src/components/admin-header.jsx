//import React from 'react';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import './admin-header.css';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

function AdminHeader() {
  const navigate = useNavigate();

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
          </Nav>

          <Nav className="ms-auto d-flex align-items-right">
            <Button variant="danger" onClick={handleLogout}>
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
