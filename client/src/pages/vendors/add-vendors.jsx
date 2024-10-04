import Button from 'react-bootstrap/Button';
import AdminHeader from '../../components/admin-header';
import { Form } from 'react-bootstrap';
import CoverImage from '../../assets/background-image.jpg';
import VendorImage from '../../assets/vendors.jpg'; 
import React, { useState } from 'react'; 
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBCardImage
} from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AddVendors() {
    const navigate = useNavigate();

    // State to hold form input values
    const [vendorData, setVendorData] = useState({
        userName: "",
        email: "",
        password: "",
        address: "",
        phoneNumber: ""
    });

    // Update state based on input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setVendorData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    //Add new vendor
    const addVendor = async (e) => {
        e.preventDefault(); 

        try {
            await axios.post('http://localhost:5296/api/admin/vendor/create-vendor', vendorData, {
                headers: {
                    'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJjOWI1YjUwYi04ODBhLTQ3NjgtYjg1ZC1iZmQ1Njc0ZTAwOTciLCJ1bmlxdWVfbmFtZSI6IkZhaG1pTmV3MSIsImVtYWlsIjoiZmFobWlAdGVzdC5jb20iLCJyb2xlIjpbIlVzZXIiLCJDU1IiLCJBZG1pbiIsIlZlbmRvciJdLCJuYmYiOjE3MjgwNjUxOTYsImV4cCI6MTcyODA2ODc5NiwiaWF0IjoxNzI4MDY1MTk2LCJpc3MiOiJFQUQiLCJhdWQiOiJDdXN0b21lcnMifQ.PEu6Gc6v3rK_TcjASLCo0ek_g_fBoeZjdgbP1wYOezE`
                }
            });
            navigate('/displayVendors');

        } catch (error) {
            console.error('Error adding vendor:', error);
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
                        <MDBCard className='bg-white my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '900px' }}>
                            <MDBCardBody className='p-3 w-100 d-flex flex-row'>

                                {/* Column for Image */}
                                <MDBCol md='6' className="d-flex justify-content-center align-items-center">
                                    <MDBCardImage
                                        src={VendorImage}
                                        alt="Vendor Image"
                                        style={{ height: '400px', width: '400px', objectFit: 'cover' }}
                                        className="rounded"
                                    />
                                </MDBCol>

                                {/* Column for Form */}
                                <MDBCol md='6'>
                                    <h4 className="form-heading">Add New Vendor</h4>
                                    <Form onSubmit={addVendor}>
                                        <Form.Group className="mb-3" controlId="name">
                                            <Form.Label>User Name</Form.Label>
                                            <Form.Control 
                                                type="text" 
                                                name="userName" 
                                                value={vendorData.userName} 
                                                onChange={handleChange}
                                            />
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="email">
                                            <Form.Label>Email Address</Form.Label>
                                            <Form.Control 
                                                type="email" 
                                                name="email"
                                                value={vendorData.email} 
                                                onChange={handleChange}
                                            />
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="password">
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control 
                                                type="password"
                                                name="password"
                                                value={vendorData.password} 
                                                onChange={handleChange}
                                            />
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="address">
                                            <Form.Label>Address</Form.Label>
                                            <Form.Control 
                                                type="text" 
                                                name="address"
                                                value={vendorData.address} 
                                                onChange={handleChange}
                                            />
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="phoneNumber">
                                            <Form.Label>Contact Number</Form.Label>
                                            <Form.Control 
                                                type="text" 
                                                name="phoneNumber"
                                                value={vendorData.phoneNumber} 
                                                onChange={handleChange}
                                            />
                                        </Form.Group>

                                        <Button variant="outline-success" className="mt-4 w-100" type="submit">
                                            Add Vendor
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

export default AddVendors;
