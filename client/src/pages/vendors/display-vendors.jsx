import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner'; // Import Spinner
import AdminHeader from '../../components/admin-header';
import './vendors.css';
import '../../app.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function DisplayVendors() {
    const navigate = useNavigate();
    const [vendors, setVendors] = useState([]);
    const [loading, setLoading] = useState(true); // Add loading state

    useEffect(() => {
        fetchVendors();
    }, []);

    // Fetch vendors from the API
    const fetchVendors = async () => {
        try {
            const token = localStorage.getItem('token');

            // If no token is found, redirect to login or show an error
            if (!token) {
                setError('No token found. Please log in.');
                return;
            }

            const response = await axios.get('http://localhost:5296/api/admin/vendor/all-vendors', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setVendors(response.data);
        } catch (error) {
            console.error('Error fetching vendors:', error);
        } finally {
            setLoading(false); // Set loading to false once data is fetched
        }
    };

    // Delete vendor
    const handleDelete = async (email) => {
        try {
            const token = localStorage.getItem('token');

            // If no token is found, redirect to login or show an error
            if (!token) {
                setError('No token found. Please log in.');
                return;
            }

            await axios.delete(`http://localhost:5296/api/admin/vendor/delete-vendor/${email}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
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

            {/* Display Spinner while loading */}
            {loading ? (
                <div className="d-flex justify-content-center align-items-center mt-5">
                    <Spinner animation="border" role="status" variant="info">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            ) : (
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
                                        <Button variant="outline-danger" onClick={() => handleDelete(vendor.email)}>
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            )}
        </div>
    );
}

export default DisplayVendors;
