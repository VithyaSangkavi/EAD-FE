import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './admin-header.css'
import { NavLink } from 'react-router-dom';

function AdminHeader() {
  return (
    <>
      {/* <Navbar className="custom-navbar" fixed="top"> */}
      <Navbar className="custom-navbar" bg="info" data-bs-theme="light" fixed="top">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/" exact className="nav-link" activeClassName="active">Home</Nav.Link>
            <Nav.Link as={NavLink} to="/displayProducts" className="nav-link" activeClassName="active">Products</Nav.Link>
            <Nav.Link as={NavLink} to="/displayCategories" className="nav-link" activeClassName="active">Categories</Nav.Link>
            <Nav.Link as={NavLink} to="/customerOrders" className="nav-link" activeClassName="active">Orders</Nav.Link>
            <Nav.Link as={NavLink} to="/displayVendors" className="nav-link" activeClassName="active">Vendors</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default AdminHeader;
