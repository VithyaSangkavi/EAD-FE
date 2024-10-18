import Button from 'react-bootstrap/Button';
import AdminHeader from '../../components/admin-header';
import { Form } from 'react-bootstrap';
import CoverImage from '../../assets/background-image.jpg';
import React, { useEffect, useState } from 'react';
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
} from 'mdb-react-ui-kit';
import { useLocation, useNavigate } from 'react-router-dom';
import productHolder from '../../assets/product-holder.png';
import axios from 'axios';

function ViewProducts() {
    const location = useLocation();
    const navigate = useNavigate();
    const { product } = location.state;
    const [categories, setCategories] = useState([]);
    const [formValues, setFormValues] = useState({
        id: '',
        name: '',
        price: 0,
        description: '',
        stockQuantity: 0,
        category: '',
        productImage: ''
    });

    // Fill form with product details when component mounts
    useEffect(() => {
        if (product) {
            setFormValues({
                id: product.id,
                name: product.name,
                price: product.price,
                description: product.description,
                stockQuantity: product.stockQuantity,
                category: product.category.id,
                productImage: product.productPicture || productHolder
            });
        }
    }, [product]);

    useEffect(() => {
        console.log('product details: ', product)
    }, []);

    // Handle input change to update state
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value
        });
    };

    const handleCategoryChange = (e) => {
        setFormValues({
            ...formValues,
            category: e.target.value,
        });
    };

    //Delete product
    const deleteProduct = async (id) => {
        try {
            const token = localStorage.getItem('token');
        
            // If no token is found, redirect to login or show an error
            if (!token) {
              setError('No token found. Please log in.');
              return;
            }

            await axios.delete(`http://localhost:5296/api/Product/delete-product/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            navigate('/displayProducts')

        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    // Fetch categories from the API
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

    //Update product
    const updateProduct = async (id, event) => {
        event.preventDefault(); // Prevent form submission behavior

        // Handle file upload if a new image is selected
        const formData = new FormData();
        formData.append('name', formValues.name);
        formData.append('price', formValues.price);
        formData.append('description', formValues.description);
        formData.append('stockQuantity', formValues.stockQuantity);
        formData.append('category', formValues.category);
        formData.append('productImage', formValues.productImage);
        formData.append('addedByUserEmail', 'fahmi@test.com');

        try {
            const token = localStorage.getItem('token');
        
            // If no token is found, redirect to login or show an error
            if (!token) {
              setError('No token found. Please log in.');
              return;
            }

            const response = await axios.put(`http://localhost:5296/api/Product/update-product/${id}`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            console.log('Product updated successfully:', response.data);
            navigate('/displayProducts'); // Navigate to the products page after update
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    //Image uploading
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormValues({
                    ...formValues,
                    productPicture: reader.result, 
                });
            };
            reader.readAsDataURL(file); 
        }
    };

    return (
        <div
            className='full-screen'
            style={{ backgroundImage: `url(${CoverImage})` }}
        >
            <AdminHeader />

            <MDBContainer fluid>
                <MDBRow className='d-flex justify-content-center align-items-center h-100'>
                    <MDBCol col='12'>
                        <MDBCard className='bg-white my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '800px', marginTop: '20px' }}>
                            <MDBCardBody className='p-3 w-100 d-flex flex-row'>
                                <MDBCol md='6' className="d-flex justify-content-center align-items-center">
                                    {/* Product Image Section */}
                                    <MDBCardImage
                                        src={formValues.productImage}
                                        alt="Product Image"
                                        style={{ height: '550px', width: '350px', objectFit: 'cover' }}
                                        className="rounded"
                                    />
                                </MDBCol>

                                <MDBCol md='6'>
                                    <h4 className="form-heading">Product Detail</h4>
                                    <Form>
                                        <Form.Group className="mb-3" controlId="name">
                                            <Form.Label>Product Name</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="name"
                                                value={formValues.name}
                                                onChange={handleInputChange}
                                            />
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="price">
                                            <Form.Label>Price</Form.Label>
                                            <Form.Control
                                                type="number"
                                                name="price"
                                                value={formValues.price}
                                                onChange={handleInputChange}
                                            />
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="description">
                                            <Form.Label>Description</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="description"
                                                value={formValues.description}
                                                onChange={handleInputChange}
                                            />
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="quantity">
                                            <Form.Label>Quantity</Form.Label>
                                            <Form.Control
                                                type="number"
                                                name="stockQuantity"
                                                value={formValues.stockQuantity}
                                                onChange={handleInputChange}
                                            />
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="category">
                                            <Form.Label>Category</Form.Label>
                                            <Form.Control
                                                as="select"
                                                value={formValues.category}
                                                onChange={handleCategoryChange}
                                            >
                                                <option value="">Select a category</option>
                                                {categories.map(category => (
                                                    category.isActive && (
                                                        <option key={category.id} value={category.id}>
                                                            {`${category.id} - ${category.name}`}
                                                        </option>
                                                    )
                                                ))}
                                            </Form.Control>
                                        </Form.Group>

                                        {/* <Form.Group className="mb-3" controlId="productImage">
                                            <Form.Label>Product Image</Form.Label>
                                            <Form.Control
                                                type="file"
                                                accept="image/*"
                                            />
                                        </Form.Group> */}

                                        <Form.Group className="mb-3" controlId="productImageUrl">
                                            <Form.Label>Product Image URL</Form.Label>
                                            <Form.Control
                                                type="file"
                                                accept="image/*"
                                                name="productImageUrl"
                                                // value={formValues.productImage || "No image uploaded"}
                                                onChange={handleFileChange} 
                                            />
                                        </Form.Group>

                                        {/* <Form.Group className="mb-3" controlId="productPicture">
                                            <Form.Label>Product Image</Form.Label>
                                            <Form.Control type="file" accept="image/*" onChange={handleFileChange} />
                                        </Form.Group> */}


                                        <Button
                                            variant="outline-warning"
                                            className="mt-4 w-40 me-2"
                                            type="submit"
                                            onClick={(event) => updateProduct(product.id, event)}
                                        >
                                            Update Product
                                        </Button>


                                        <Button
                                            variant="outline-danger"
                                            className="ms-2 mt-4 w-40"
                                            onClick={() => {
                                                if (window.confirm("Are you sure you want to delete this product?")) {
                                                    deleteProduct(product.id);
                                                }
                                            }}
                                        >
                                            Delete Product
                                        </Button>

                                    </Form>
                                </MDBCol>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </div>
    );
}

export default ViewProducts;
