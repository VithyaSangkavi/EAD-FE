import Button from 'react-bootstrap/Button';
import AdminHeader from '../../components/admin-header';
import { CloseButton, Form } from 'react-bootstrap';
import CoverImage from '../../assets/background-image.jpg';
import React, { useState } from 'react';
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
} from 'mdb-react-ui-kit';
import { useLocation, useNavigate } from 'react-router-dom';
import productHolder from '../../assets/order-pic.jpg';
import './orders.css'

function ViewOrder() {
    const location = useLocation(); 
    const order = location.state?.order;
    const navigate = useNavigate();
    const [orderStatus, setOrderStatus] = useState('Pending'); 

    //Status Change
    const handleStatusChange = (e) => {
        const newStatus = e.target.value;
        setOrderStatus(newStatus);
        console.log("Order status changed to:", newStatus);
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
                        <CloseButton
                            onClick={() => navigate('/customerOrders')}
                            className="custom-close-button"
                            style={{ position: 'absolute', top: '140px', right: '380px', zIndex: 10 }}
                        />
                        <MDBCard className='bg-white my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '800px' }}>
                            <MDBCardBody className='p-3 w-100 d-flex flex-row'>
                                <MDBCol md='6' className="d-flex justify-content-center align-items-center">
                                    <MDBCardImage
                                        src={productHolder}
                                        alt="Product Image"
                                        style={{ height: '350px', width: '350px', objectFit: 'cover' }}
                                        className="rounded"
                                    />
                                </MDBCol>

                                <MDBCol md='6'>
                                    <div>

                                        <h5>Items:</h5>
                                        <ul>
                                            {order.items.map((item) => (
                                                <li key={item.productId}>
                                                    {item.productName} - Quantity: {item.quantity}, Price: {item.price}
                                                </li>
                                            ))}
                                        </ul>
                                        <p>User Email: {order.checkoutUuid}</p>
                                        <p>ID: {order.id}</p>
                                        <p>Checkout ID: {order.paymentStatus}</p>
                                        <p>
                                            Created Date: {
                                                new Date(order.createdAt).toLocaleString('en-US', {
                                                    year: 'numeric',
                                                    month: '2-digit',
                                                    day: '2-digit',
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                    hour12: true,
                                                })
                                            }
                                        </p>
                                        <p>Purchase Status: {order.purchaseStatus}</p>
                                        <p>Payment Status: {order.paymentStatus}</p>
                                    </div>

                                    <h5>-----------------------------------------------</h5>

                                    <div className="form-group">
                                        <h5>Change Order Status: </h5>
                                        <select id="orderStatus" className="form-control" onChange={(e) => handleStatusChange(e)}>
                                            <option value="Pending">Pending</option>
                                            <option value="Processing">Processing</option>
                                            <option value="Shipped">Shipped</option>
                                            <option value="Delivered">Delivered</option>
                                            <option value="Cancelled">Cancelled</option>
                                        </select>
                                    </div>
                                    <br />
                                    <Button variant="outline-success" className="mt-4 w-100" type="submit" onClick={() => navigate('/customerOrders')}>
                                        Confirm Order Status
                                    </Button>
                                </MDBCol>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </div>
    );
}

export default ViewOrder;
