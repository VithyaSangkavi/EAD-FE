import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import AdminHeader from '../../components/admin-header';
import '../vendors/vendors.css';
import '../../app.css';
import { Button, Spinner, Modal } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function DisplayPurchase() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true); // Loading state
    const [showModal, setShowModal] = useState(false); // Modal visibility state
    const [selectedOrder, setSelectedOrder] = useState(null); // Store selected order for modal
    const navigate = useNavigate();

    useEffect(() => {
        fetchOrders();
    }, []);

    // Fetch Orders from the API
    const fetchOrders = async () => {
        try {
            const token = localStorage.getItem('token');

            // If no token is found, redirect to login or show an error
            if (!token) {
                setError('No token found. Please log in.');
                setLoading(false);
                return;
            }

            const response = await axios.get('http://localhost:5296/api/Purchase/all-purchases/admin', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setOrders(response.data); // Set orders in state
            console.log('orders: ', response.data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        } finally {
            setLoading(false); // Stop loading after data is fetched
        }
    };

    const handleViewDetails = (order) => {
        setSelectedOrder(order); // Set the selected order
        setShowModal(true); // Show the modal
    };

    const handleCloseModal = () => {
        setShowModal(false); // Hide the modal
        setSelectedOrder(null); // Clear selected order
    };

    const handleChangeShippingStatus = async () => {
        try {
            const token = localStorage.getItem('token');
            const email = localStorage.getItem('userEmail');

            // If no token is found, redirect to login or show an error
            if (!token) {
                setError('No token found. Please log in.');
                setLoading(false);
                return;
            }

            const response = await axios.put(`http://localhost:5296/api/Purchase/update-shipping-status/${selectedOrder.purchaseId}/${email}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setOrders(response.data); // Set orders in state
            console.log('orders: ', response.data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        } finally {
            setLoading(false); // Stop loading after data is fetched
        }
        console.log(`Changing shipping status for order: ${selectedOrder}`);
        handleCloseModal(); // Close modal after action
    };

    const handleChangeDeliveryStatus = async () => {
        try {
            const token = localStorage.getItem('token');
            const email = localStorage.getItem('userEmail');

            // If no token is found, redirect to login or show an error
            if (!token) {
                setError('No token found. Please log in.');
                setLoading(false);
                return;
            }

            const response = await axios.put(`http://localhost:5296/api/Purchase/update-delivery-status/${selectedOrder.purchaseId}/${email}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setOrders(response.data); // Set orders in state
            console.log('orders: ', response.data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        } finally {
            setLoading(false); // Stop loading after data is fetched
        }
        console.log(`Changing delivery status for order: ${selectedOrder.id}`);
        handleCloseModal(); // Close modal after action
    };

    return (
        <div className="container-fluid">
            <AdminHeader />

            {/* Loading spinner */}
            {loading ? (
                <div className="d-flex justify-content-center align-items-center mt-5">
                    <Spinner animation="border" role="status" variant="info">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            ) : (
                <div style={{ width: '80%', overflowX: 'auto', margin: '50px auto' }}>
                    <h3>Customer Purchases</h3> <br />
                    <Table striped bordered hover style={{ width: '100%' }}>
                        <thead>
                            <tr>
                                <th>User Email</th>
                                <th>Product Name</th>
                                <th>Total Amount</th>
                                <th>Product Quantity</th>
                                <th>Shipped Status</th>
                                <th>Delivered Status</th>
                                <th>View Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.length > 0 ? (
                                orders.map((order) => (
                                    // Map through each order
                                    order.items.map((item) => (
                                        // Map through each item in the order
                                        <tr key={item.productId}> {/* Use a unique key for each item */}
                                            {item === order.items[0] ? ( // Only display userEmail for the first item
                                                <td rowSpan={order.items.length}>{order.userEmail}</td>
                                            ) : null}
                                            <td>{item.productName}</td>
                                            <td>{item.price}</td>
                                            <td>{item.quantity}</td>
                                            <td>{order.isShipped ? 'Shipped' : 'Not Shipped'}</td>
                                            <td>{order.isDelivered ? 'Delivered' : 'Not Delivered'}</td>
                                            <td>
                                                <Button variant="outline-info" onClick={() => handleViewDetails(order)}>
                                                    View
                                                </Button>
                                            </td>
                                        </tr>
                                    ))
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7">No orders available</td>
                                </tr>
                            )}
                        </tbody>
                    </Table>

                    {/* Modal for order details */}
                    <Modal show={showModal} onHide={handleCloseModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>Order Details</Modal.Title>
                        </Modal.Header>
                         <Modal.Body>
                            {selectedOrder && (
                                <div>
                                    <h5>User Email: {selectedOrder.userEmail}</h5>
                                    <h6>Items:</h6>
                                    <ul>
                                        {selectedOrder.items.map(item => (
                                            <li key={item.productId}>{item.productName} (Quantity: {item.quantity})</li>
                                        ))}
                                    </ul>
                                    <p>Shipped Status: {selectedOrder.isShipped ? 'Shipped' : 'Not Shipped'}</p>
                                    <p>Delivered Status: {selectedOrder.isDelivered ? 'Delivered' : 'Not Delivered'}</p>
                                </div>
                            )}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleCloseModal}>
                                Close
                            </Button>
                            {!selectedOrder?.isShipped && ( // Render button only if not shipped
                                <Button variant="warning" onClick={handleChangeShippingStatus}>
                                    Change Shipping Status
                                </Button>
                            )}
                            {!selectedOrder?.isDelivered && ( // Render button only if not delivered
                                <Button variant="success" onClick={handleChangeDeliveryStatus}>
                                    Change Delivery Status
                                </Button>
                            )}
                        </Modal.Footer>
                    </Modal>
                </div>
            )}
        </div>
    );
}

export default DisplayPurchase;
