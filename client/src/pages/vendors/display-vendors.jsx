import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Modal from 'react-bootstrap/Modal'; 
import AdminHeader from '../../components/admin-header';
import './vendors.css';
import '../../app.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function DisplayVendors() {
    const navigate = useNavigate();
    const [vendors, setVendors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false); // State for modal visibility
    const [selectedVendorEmail, setSelectedVendorEmail] = useState(null); // Store vendor email for deletion

    useEffect(() => {
        fetchVendors();
    }, []);

    const fetchVendors = async () => {
        try {
            const token = localStorage.getItem('token');

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
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        try {
            const token = localStorage.getItem('token');

            if (!token) {
                setError('No token found. Please log in.');
                return;
            }

            await axios.delete(`http://localhost:5296/api/admin/vendor/delete-vendor/${selectedVendorEmail}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            fetchVendors();
            handleCloseModal(); // Close the modal after deletion
        } catch (error) {
            console.error('Error deleting vendor:', selectedVendorEmail);
        }
    };

    const handleShowModal = (email) => {
        setSelectedVendorEmail(email);
        setShowModal(true); // Show confirmation modal
    };

    const handleCloseModal = () => {
        setShowModal(false); // Hide modal
        setSelectedVendorEmail(null); // Clear the selected vendor
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

            {loading ? (
                <div className="d-flex justify-content-center align-items-center mt-5">
                    <Spinner animation="border" role="status" variant="info">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            ) : (
                <div style={{ width: '80%', overflowX: 'auto', margin: '50px auto' }}>
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
                                        <Button variant="outline-danger" onClick={() => handleShowModal(vendor.email)}>
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            )}

            {/* Confirmation Modal */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete this vendor?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default DisplayVendors;
