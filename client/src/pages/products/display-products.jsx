//import React from 'react';
import { Container, Button, Card, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import AdminHeader from '../../components/admin-header';
import './products.css';
import productHolder from '../../assets/product-holder.png';

const DisplayProducts = () => {
  const navigate = useNavigate();

  return (
    <div>
      <AdminHeader />

      <Container className="mt-5">
        <Button
          variant="info"
          className="top-right-button mb-4"
          onClick={() => navigate('/addProducts')}
        >
          Add New Products
        </Button>

        <br />

        <Row xs={1} sm={2} md={3} lg={5} className="g-4">
          {[...Array(10)].map((_, index) => (
            <Col key={index}>
              <Card style={{ width: '100%', top: '50px' }}>
                <Card.Img
                  variant="top"
                  src={productHolder}
                  alt="Product Placeholder"
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <Card.Body>
                  <Card.Title>Product {index + 1}</Card.Title>
                  <Card.Text>
                    Some quick example text to build on the card title and make
                    up the bulk of the card&#39;s content.
                  </Card.Text>
                  <Button
                    variant="outline-info"
                    onClick={() => navigate('/viewProduct')}
                  >
                    View Product
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default DisplayProducts;
