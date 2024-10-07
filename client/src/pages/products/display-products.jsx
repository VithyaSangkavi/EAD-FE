import React, { useEffect, useState } from 'react';
import { Container, Button, Card, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import AdminHeader from '../../components/admin-header';
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
            const response = await axios.get('http://localhost:5296/api/Product/all-products', {
                headers: {
                    'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJjOWI1YjUwYi04ODBhLTQ3NjgtYjg1ZC1iZmQ1Njc0ZTAwOTciLCJ1bmlxdWVfbmFtZSI6IkZhaG1pTmV3MSIsImVtYWlsIjoiZmFobWlAdGVzdC5jb20iLCJyb2xlIjpbIlVzZXIiLCJDU1IiLCJBZG1pbiIsIlZlbmRvciJdLCJuYmYiOjE3MjgyMzI3MzcsImV4cCI6MTcyODIzNjMzNywiaWF0IjoxNzI4MjMyNzM3LCJpc3MiOiJFQUQiLCJhdWQiOiJDdXN0b21lcnMifQ.HLYXUPtudu6iURXYwrXy7BXex0zexumVeL3MrycCZUU`
                }
            });
            setProducts(response.data); // Store the fetched products in state
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

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
                    {products.length > 0 ? (
                        products.map((product) => (
                            <Col key={product.id}>
                                <Card style={{ width: '100%', top: '50px' }}>
                                    <Card.Img
                                        variant="top"
                                        src={product.productPicture ? product.productPicture : productHolder}
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
                                            <strong>Stock: </strong>{product.stockQuantity}
                                        </Card.Text>
                                        <Button
                                            variant="outline-info"
                                            onClick={() => navigate(`/viewProduct`, { state: { product } })}
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
        </div>
    );
};

export default DisplayProducts;
