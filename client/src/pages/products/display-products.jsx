import React, { useEffect, useState } from 'react';
import { Container, Button, Card, Row, Col, Spinner, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './products.css';
import productHolder from '../../assets/product-holder.png';
import axios from 'axios';

const DisplayProducts = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]); // State to store categories
  const [selectedCategory, setSelectedCategory] = useState('all'); // Default selected category is "all"
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(''); // State for error message

  useEffect(() => {
    fetchCategories(); // Fetch categories on component mount
    fetchProducts(); // Fetch all products initially
  }, []);

  useEffect(() => {
    if (selectedCategory !== 'all') {
      fetchProductsByCategory(); // Fetch products by category when a specific category is selected
    } else {
      fetchProducts(); // Fetch all products if "all" is selected
    }
  }, [selectedCategory]);

  // Fetch all products
  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return;
      }
      setLoading(true);
      setErrorMessage(''); // Clear any previous errors
      const response = await axios.get(
        'http://localhost:5296/api/Product/all-products',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch products by selected category
  const fetchProductsByCategory = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return;
      }
      setLoading(true);
      setErrorMessage(''); // Clear any previous errors
      const response = await axios.get(
        `http://localhost:5296/api/Product/products-by-category/${selectedCategory}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.length === 0) {
        setErrorMessage(`No products found for category: ${selectedCategory}`);
      }

      setProducts(response.data);
    } catch (error) {
      console.error(`Error fetching products by category: ${selectedCategory}`, error);
      setErrorMessage('No products available for this category');
    } finally {
      setLoading(false);
    }
  };

  // Fetch available categories
  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem('token');
      const email = localStorage.getItem('userEmail');

      // If no token is found, redirect to login or show an error
      if (!token) {
        setError('No token found. Please log in.');
        return;
      }

      const response = await axios.get(`http://localhost:5296/api/Category/all-categories/${email}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setCategories(response.data.categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
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

      {/* Category Filter */}
      <Form.Group controlId="categorySelect" className="mb-4">
        <Form.Label>Select Category</Form.Label>
        <Form.Control
          as="select"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="all">All Categories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </Form.Control>
      </Form.Group>

      {/* Show a loading spinner while products are being fetched */}
      {loading ? (
        <div className="d-flex justify-content-center align-items-center">
          <Spinner animation="border" role="status" variant="info">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : errorMessage ? (
        <p>{errorMessage}</p>
      ) : (
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
            <p>No products to display for the selected category.</p>
          )}
        </Row>
      )}
    </Container>
  );
};

export default DisplayProducts;
