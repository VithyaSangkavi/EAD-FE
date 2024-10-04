import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import AdminHeader from '../../components/admin-header';
import '../vendors/vendors.css';
import '../../app.css';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function CustomerOrders() {
    const [orders, setOrders] = useState([]); // State to hold fetched orders
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        fetchOrders();
    }, []);

    // Fetch Orders from the API
    const fetchOrders = async () => {
        try {
            const response = await axios.get('http://localhost:5296/api/Order/all-orders', {
                headers: {
                    'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJjOWI1YjUwYi04ODBhLTQ3NjgtYjg1ZC1iZmQ1Njc0ZTAwOTciLCJ1bmlxdWVfbmFtZSI6IkZhaG1pTmV3MSIsImVtYWlsIjoiZmFobWlAdGVzdC5jb20iLCJyb2xlIjpbIlVzZXIiLCJDU1IiLCJBZG1pbiIsIlZlbmRvciJdLCJuYmYiOjE3MjgwNjUxOTYsImV4cCI6MTcyODA2ODc5NiwiaWF0IjoxNzI4MDY1MTk2LCJpc3MiOiJFQUQiLCJhdWQiOiJDdXN0b21lcnMifQ.PEu6Gc6v3rK_TcjASLCo0ek_g_fBoeZjdgbP1wYOezE`
                }
            });
            setOrders(response.data); // Set orders in state
            console.log('orders: ', response.data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    const handleViewDetails = (order) => {
        navigate('/viewOrder', { state: { order } }); // Navigate to OrderDetails and pass order
    };

    return (
        <div className="container-fluid">
            <AdminHeader />

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
        </div>
    );
}

export default CustomerOrders;
