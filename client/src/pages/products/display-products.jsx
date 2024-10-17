import React, { useEffect, useState } from 'react';
import { Container, Button, Card, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import './products.css';
import productHolder from '../../assets/product-holder.png';
import axios from 'axios';

const DisplayProducts = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  // Fetch products from the API
  const fetchProducts = async () => {
    try {
      // Get token from localStorage (make sure it's stored when the user logs in)
      const token = localStorage.getItem('token');

      // If no token is found, redirect to login or show an error
      if (!token) {
        setError('No token found. Please log in.');
        return;
      }

      const response = await axios.get(
        'http://localhost:5296/api/Product/all-products',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProducts(response.data); // Store the fetched products in state
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  return (
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
        {products.length > 0 ? (
          products.map((product) => (
            <Col key={product.id}>
              <Card style={{ width: '100%', top: '50px' }}>
                <Card.Img
                  variant="top"
                  src={
                    product.productPicture
                      ? product.productPicture
                      : productHolder
                  }
                  alt={product.name}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>{product.description}</Card.Text>
                  <Card.Text>
                    <strong>Price: </strong>Rs.{product.price}.00
                  </Card.Text>
                  <Card.Text>
                    <strong>Stock: </strong>
                    {product.stockQuantity}
                  </Card.Text>
                  <Button
                    variant="outline-info"
                    onClick={() =>
                      navigate(`/viewProduct`, { state: { product } })
                    }
                  >
                    View Product
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p>No products available</p>
        )}
      </Row>
    </Container>
  );
};

export default DisplayProducts;
