import Button from 'react-bootstrap/Button';
import AdminHeader from '../../components/admin-header';
import { Form } from 'react-bootstrap';
import CoverImage from '../../assets/background-image.jpg';
import React from 'react';
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
} from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
import productHolder from '../../assets/product-holder.png';

function ViewProducts() {
    const navigate = useNavigate();

    return (
        <div
            className='full-screen'
            style={{ backgroundImage: `url(${CoverImage})` }}
        >
            <AdminHeader />

            <MDBContainer fluid>
                <MDBRow className='d-flex justify-content-center align-items-center h-100'>
                    <MDBCol col='12'>
                        <MDBCard className='bg-white my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '800px' }}>
                            <MDBCardBody className='p-3 w-100 d-flex flex-row'>
                                <MDBCol md='6' className="d-flex justify-content-center align-items-center">
                                    {/* Product Image Section */}
                                    <MDBCardImage
                                        src={productHolder}
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
                                            <Form.Control type="text" />
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="price">
                                            <Form.Label>Price</Form.Label>
                                            <Form.Control type="number" />
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="description">
                                            <Form.Label>Description</Form.Label>
                                            <Form.Control type="text" />
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="quantity">
                                            <Form.Label>Quantity</Form.Label>
                                            <Form.Control type="number" />
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="productImage">
                                            <Form.Label>Product Image</Form.Label>
                                            <Form.Control type="file" accept="image/*" />
                                        </Form.Group>

                                        <Button variant="outline-warning" className="mt-4 w-40 me-2" type="submit" onClick={() => navigate('/displayProducts')}>
                                            Update Product
                                        </Button>

                                        <Button variant="outline-danger" className="ms-2 mt-4 w-40" type="submit" onClick={() => navigate('/displayProducts')}>
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
