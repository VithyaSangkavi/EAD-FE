import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import AdminHeader from '../../components/admin-header';
import './vendors.css';
import '../../app.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function DisplayVendors() {
    const navigate = useNavigate();
    const [vendors, setVendors] = useState([]);

    useEffect(() => {
        fetchVendors();
    }, []);

    // Fetch vendors from the API
    const fetchVendors = async () => {
        try {
            const response = await axios.get('http://localhost:5296/api/admin/vendor/all-vendors', {
                headers: {
                    'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJjOWI1YjUwYi04ODBhLTQ3NjgtYjg1ZC1iZmQ1Njc0ZTAwOTciLCJ1bmlxdWVfbmFtZSI6IkZhaG1pTmV3MSIsImVtYWlsIjoiZmFobWlAdGVzdC5jb20iLCJyb2xlIjpbIlVzZXIiLCJDU1IiLCJBZG1pbiIsIlZlbmRvciJdLCJuYmYiOjE3MjgwNjcyNjgsImV4cCI6MTcyODA3MDg2OCwiaWF0IjoxNzI4MDY3MjY4LCJpc3MiOiJFQUQiLCJhdWQiOiJDdXN0b21lcnMifQ.QxkXQqkEwyxKBYv4RMQoxKMklCdQCJ6E3J0QJu-IYWg`
                }
            });
            setVendors(response.data); 
        } catch (error) {
            console.error('Error fetching vendors:', error);
        }
    };

    //Delete vendor
    const handleDelete = async (email) => {
        try {
            await axios.delete(`http://localhost:5296/api/admin/vendor/delete-vendor/${email}`, {
                headers: {
                    'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJjOWI1YjUwYi04ODBhLTQ3NjgtYjg1ZC1iZmQ1Njc0ZTAwOTciLCJ1bmlxdWVfbmFtZSI6IkZhaG1pTmV3MSIsImVtYWlsIjoiZmFobWlAdGVzdC5jb20iLCJyb2xlIjpbIlVzZXIiLCJDU1IiLCJBZG1pbiIsIlZlbmRvciJdLCJuYmYiOjE3MjgwNjcyNjgsImV4cCI6MTcyODA3MDg2OCwiaWF0IjoxNzI4MDY3MjY4LCJpc3MiOiJFQUQiLCJhdWQiOiJDdXN0b21lcnMifQ.QxkXQqkEwyxKBYv4RMQoxKMklCdQCJ6E3J0QJu-IYWg`
                }
            });

            fetchVendors();
        } catch (error) {
            console.error('Error deleting vendor:', email);
        }
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
                <h3>Vendors List</h3><br />
                <Table striped bordered hover style={{ width: '100%' }}>
                    <thead>
                        <tr>
                            <th>User Name</th>
                            <th>Vendor Email</th>
                            <th>Address</th>
                            <th>Contact Number</th>
                            <th>Created Date</th>
                            <th>Delete Vendor</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vendors.map(vendor => (
                            <tr key={vendor.id}>
                                <td>{vendor.userName}</td>
                                <td>{vendor.email}</td>
                                <td>{vendor.address}</td>
                                <td>{vendor.phoneNumber}</td>
                                <td>{new Date(vendor.createdOn).toLocaleDateString()}</td>
                                <td>
                                    <Button variant="outline-danger" onClick={() => handleDelete(vendor.email)}>Delete</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
    );
}

export default DisplayVendors;
