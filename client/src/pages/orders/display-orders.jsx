import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import AdminHeader from '../../components/admin-header';
import '../vendors/vendors.css';
import '../../app.css';
import { Button, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CustomerOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true); // Loading state
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

            const response = await axios.get('http://localhost:5296/api/Order/all-orders', {
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
        navigate('/viewOrder', { state: { order } }); // Navigate to OrderDetails and pass order
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
                <div style={{ width: '80%', overflowX: 'auto', margin: '100px auto' }}>
                    <h3>Customer Orders</h3> <br />
                    <Table striped bordered hover style={{ width: '100%' }}>
                        <thead>
                            <tr>
                                <th>User Email</th>
                                <th>Product Name</th>
                                <th>Total Amount</th>
                                <th>Product Quantity</th>
                                <th>Purchase Status</th>
                                <th>Payment Status</th>
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
                                            <td>{order.purchaseStatus}</td>
                                            <td>{order.paymentStatus}</td>
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
                </div>
            )}
        </div>
    );
}

export default CustomerOrders;