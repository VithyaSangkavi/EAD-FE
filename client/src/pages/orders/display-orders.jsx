import React from 'react';
import Table from 'react-bootstrap/Table';
import AdminHeader from '../../components/admin-header';
import '../vendors/vendors.css';
import '../../app.css'
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

function CustomerOrders() {

    const navigate = useNavigate();

    return (
        <div className="container-fluid">
            <AdminHeader />

            <div style={{ width: '80%', overflowX: 'auto', margin: '100px auto' }}>
                <h3>Customer Orders</h3> <br />
                <Table striped bordered hover style={{ width: '100%' }}>
                    <thead>
                        <tr>
                            <th>Customer ID</th>
                            <th>Customer Name</th>
                            <th>Product Name</th>
                            <th>Product Quantity</th>
                            <th>Total Amount</th>
                            <th>Order Status</th>
                            <th>View Order</th>
                            <th>Cancel Order</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>12345</td>
                            <td>Mark</td>
                            <td>Books</td>
                            <td>150</td>
                            <td>7500</td>
                            <td>Pending</td>
                            <td>
                                <Button variant="outline-info" onClick={() => navigate('/viewOrder')}>View</Button>
                            </td>
                            <td>
                                <Button variant="outline-danger" >Cancel</Button>
                            </td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Jacob</td>
                            <td>Books</td>
                            <td>150</td>
                            <td>7500</td>
                            <td>Completed</td>
                            <td>
                                <Button variant="outline-info" >View</Button>
                            </td>
                            <td>
                                <Button variant="outline-danger" >Cancel</Button>
                            </td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>Jacob</td>
                            <td>Books</td>
                            <td>150</td>
                            <td>7500</td>
                            <td>Pending</td>
                            <td>
                                <Button variant="outline-info" >View</Button>
                            </td>
                            <td>
                                <Button variant="outline-danger" >Cancel</Button>
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        </div>
    );
}

export default CustomerOrders;
