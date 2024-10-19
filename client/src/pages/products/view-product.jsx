import Button from 'react-bootstrap/Button';
import AdminHeader from '../../components/admin-header';
import { Form, Modal } from 'react-bootstrap';
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

    // States for modals visibility
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);

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
        fetchCategories();
    }, []);

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

    // Handle file upload for product image
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

    // Fetch categories from API
    const fetchCategories = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`http://localhost:5296/api/Category/all-categories/${localStorage.getItem('userEmail')}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setCategories(response.data.categories);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    // Delete product
    const deleteProduct = async () => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:5296/api/Product/delete-product/${product.id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setShowDeleteModal(false); // Close the modal
            navigate('/displayProducts');
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    // Update product
    const updateProduct = async (event) => {
        const email = localStorage.getItem('userEmail')
        event.preventDefault();
        const formData = new FormData();
        formData.append('name', formValues.name);
        formData.append('price', formValues.price);
        formData.append('description', formValues.description);
        formData.append('stockQuantity', formValues.stockQuantity);
        formData.append('category', formValues.category);
        formData.append('productImage', formValues.productImage);
        formData.append('addedByUserEmail', email);

        try {
            const token = localStorage.getItem('token');
            await axios.put(`http://localhost:5296/api/Product/update-product/${product.id}`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            setShowUpdateModal(false); // Close the modal
            navigate('/displayProducts');
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    return (
        <div className='full-screen-add' style={{ backgroundImage: `url(${CoverImage})` }}>
            <AdminHeader />

            <MDBContainer fluid>
                <MDBRow className='d-flex justify-content-center align-items-center h-100'>
                    <MDBCol col='12'>
                        <MDBCard className='bg-white my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '800px' }}>
                            <MDBCardBody className='p-3 w-100 d-flex flex-row'>
                                <MDBCol md='6' className="d-flex justify-content-center align-items-center">
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
                                        {/* Form Fields */}
                                        <Form.Group className="mb-3" controlId="name">
                                            <Form.Label>Product Name</Form.Label>
                                            <Form.Control type="text" name="name" value={formValues.name} onChange={handleInputChange} />
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="price">
                                            <Form.Label>Price</Form.Label>
                                            <Form.Control type="number" name="price" value={formValues.price} onChange={handleInputChange} />
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="description">
                                            <Form.Label>Description</Form.Label>
                                            <Form.Control type="text" name="description" value={formValues.description} onChange={handleInputChange} />
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="quantity">
                                            <Form.Label>Quantity</Form.Label>
                                            <Form.Control type="number" name="stockQuantity" value={formValues.stockQuantity} onChange={handleInputChange} />
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="category">
                                            <Form.Label>Category</Form.Label>
                                            <Form.Control as="select" value={formValues.category} onChange={handleCategoryChange}>
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

                                        <Form.Group className="mb-3" controlId="productImageUrl">
                                            <Form.Label>Product Image URL</Form.Label>
                                            <Form.Control type="file" accept="image/*" onChange={handleFileChange} />
                                        </Form.Group>

                                        {/* Update and Delete Buttons */}
                                        <Button variant="outline-warning" className="mt-4 w-40 me-2" onClick={() => setShowUpdateModal(true)}>
                                            Update Product
                                        </Button>

                                        <Button variant="outline-danger" className="ms-2 mt-4 w-40" onClick={() => setShowDeleteModal(true)}>
                                            Delete Product
                                        </Button>
                                    </Form>
                                </MDBCol>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>

            {/* Delete Confirmation Modal */}
            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this product?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
                    <Button variant="danger" onClick={deleteProduct}>Delete</Button>
                </Modal.Footer>
            </Modal>

            {/* Update Confirmation Modal */}
            <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to update this product?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowUpdateModal(false)}>Cancel</Button>
                    <Button variant="warning" onClick={updateProduct}>Update</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default ViewProducts;
