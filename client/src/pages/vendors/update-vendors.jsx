import Button from 'react-bootstrap/Button';
import AdminHeader from '../../components/admin-header';
import { Form } from 'react-bootstrap';
import CoverImage from '../../assets/background-image.jpg'
import React from 'react';
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody
}
    from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';

function UpdateVendor() {
    
    const navigate = useNavigate();

    return (
        <div
            className='full-screen'
            style={{ backgroundImage: `url(${CoverImage})` }}
        >
            <AdminHeader></AdminHeader>

            <MDBContainer fluid>

                <MDBRow className='d-flex justify-content-center align-items-center h-100'>
                    <MDBCol col='12'>

                        <MDBCard className='bg-white my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '500px' }}>
                            <MDBCardBody className='p-3 w-100 d-flex flex-column'>

                                <h4 className="form-heading">Update Existing Vendor</h4>

                                <Form>
                                    <Form.Group className="mb-3" controlId="name">
                                        <Form.Label>First Name</Form.Label>
                                        <Form.Control type="text" />

                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="lname">
                                        <Form.Label>Last Name</Form.Label>
                                        <Form.Control type="text" />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="email">
                                        <Form.Label>Email Address</Form.Label>
                                        <Form.Control type="email" />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="regno">
                                        <Form.Label>Registration Number</Form.Label>
                                        <Form.Control type="text" />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="contactno">
                                        <Form.Label>Contact Number</Form.Label>
                                        <Form.Control type="text" />
                                    </Form.Group>

                                    <Button variant="warning" className="mt-4 w-100" type="submit" onClick={() => navigate('/displayVendors')}>
                                        Update
                                    </Button>
                                </Form>

                            </MDBCardBody>
                        </MDBCard>

                    </MDBCol>
                </MDBRow>

            </MDBContainer>

        </div>
    );
}

export default UpdateVendor;