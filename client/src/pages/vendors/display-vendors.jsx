import React from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button'; // Import Button from react-bootstrap
import AdminHeader from '../../components/admin-header';
import './vendors.css';
import '../../app.css'
import { useNavigate } from 'react-router-dom';

function DisplayVendors() {
    
    const navigate = useNavigate();

    const handleUpdate = (id) => {
        // Logic for updating vendor with the given id
        console.log(`Update vendor with id: ${id}`);
        navigate('/updateVendor')
    };

    const handleDelete = (id) => {
        // Logic for deleting vendor with the given id
        console.log(`Delete vendor with id: ${id}`);
    };

    return (
        <div className="container-fluid">
            <AdminHeader />
            <Button
                variant="info"
                className="top-right-button mb-4"
                onClick={() => navigate('/addVendors')}
            >
                Add New Vendors
            </Button>
            <div style={{ width: '80%', overflowX: 'auto', margin: '100px auto' }}>
                <h3>Vendors List</h3> <br />
                <Table striped bordered hover style={{ width: '100%' }}>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Vendor Email</th>
                            <th>Registration Number</th>
                            <th>Contact Number</th>
                            <th>Actions</th> {/* New Actions column */}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                            <td>12345</td>
                            <td>123-456-7890</td>
                            <td>
                                <Button variant="outline-warning" onClick={() => handleUpdate(1)}>Update</Button> {/* Update button */}
                                <Button variant="outline-danger" onClick={() => handleDelete(1)} style={{ marginLeft: '10px' }}>Delete</Button> {/* Delete button */}
                            </td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                            <td>67890</td>
                            <td>987-654-3210</td>
                            <td>
                                <Button variant="outline-warning" onClick={() => handleUpdate(2)}>Update</Button>
                                <Button variant="outline-danger" onClick={() => handleDelete(2)} style={{ marginLeft: '10px' }}>Delete</Button>
                            </td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@twitter</td>
                            <td>11111</td>
                            <td>555-555-5555</td>
                            <td>
                                <Button variant="outline-warning" onClick={() => handleUpdate(3)}>Update</Button>
                                <Button variant="outline-danger" onClick={() => handleDelete(3)} style={{ marginLeft: '10px' }}>Delete</Button>
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        </div>
    );
}

export default DisplayVendors;
