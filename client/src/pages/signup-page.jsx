import React, { useState } from 'react';
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBRadio
} from 'mdb-react-ui-kit';
import CoverImage from '../assets/background-image.jpg';
import { useNavigate } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';

function SignupPage() {
    const navigate = useNavigate();
    const [userType, setUserType] = useState('');

    const handleUserTypeChange = (value) => {
        setUserType(value);
    };

    return (
        <div
            className='full-screen'
            style={{ backgroundImage: `url(${CoverImage})` }}
        >
            <MDBContainer fluid>
                <MDBRow className='d-flex justify-content-center align-items-center h-100'>
                    <MDBCol col='12'>
                        <MDBCard className='bg-white my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '500px' }}>
                            <MDBCardBody className='p-4 w-100 d-flex flex-column'>
                                <h2 className="fw-bold mb-2 text-center">Sign Up</h2>
                                <p className="text-white-50 mb-3">Please enter your details to create an account</p>

                                {/* <MDBInput wrapperClass='mb-2 w-100' label='First Name' id='firstName' type='text' size="sm" />
                                <MDBInput wrapperClass='mb-2 w-100' label='Last Name' id='lastName' type='text' size="sm" />
                                <MDBInput wrapperClass='mb-2 w-100' label='Email address' id='email' type='email' size="sm" />
                                <MDBInput wrapperClass='mb-2 w-100' label='Password' id='password' type='password' size="sm" />
                                <MDBInput wrapperClass='mb-2 w-100' label='Confirm Password' id='confirmPassword' type='password' size="sm" /> */}

                                <Form>
                                    <Form.Group className="mb-3" controlId="firstName">
                                        <Form.Label>First Name</Form.Label>
                                        <Form.Control type="text" />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="lastName">
                                        <Form.Label>Last Name</Form.Label>
                                        <Form.Control type="text" />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control type="email" />

                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>Confirm Password</Form.Label>
                                        <Form.Control type="password" />
                                    </Form.Group>

                                    <div className="mb-4">

                                        <Form.Label>User Role</Form.Label>
                                        <br />
                                        <MDBRadio
                                            name="userType"
                                            id="admin"
                                            label="Admin"
                                            inline
                                            checked={userType === 'admin'}
                                            onChange={() => handleUserTypeChange('admin')}
                                        />
                                        <MDBRadio
                                            name="userType"
                                            id="vendor"
                                            label="Vendor"
                                            inline
                                            checked={userType === 'vendor'}
                                            onChange={() => handleUserTypeChange('vendor')}
                                        />
                                        <MDBRadio
                                            name="userType"
                                            id="csr"
                                            label="CSR"
                                            inline
                                            checked={userType === 'customer_service_representative'}
                                            onChange={() => handleUserTypeChange('customer_service_representative')}
                                        />
                                    </div>

                                    <Button variant="info" className="mt-4 w-100" type="submit" onClick={() => navigate('/login')}>
                                        Create Account
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

export default SignupPage;
