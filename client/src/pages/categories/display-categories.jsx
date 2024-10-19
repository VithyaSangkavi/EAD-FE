import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import AdminHeader from '../../components/admin-header';
import '../vendors/vendors.css';
import '../../app.css';
import { Button, Spinner } from 'react-bootstrap';
import axios from 'axios';

function DisplayProductCategories() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true); // Loading state

    useEffect(() => {
        fetchCategories();
    }, []);

    // Fetch categories from the API
    const fetchCategories = async () => {
        try {
            const token = localStorage.getItem('token');
            const email = localStorage.getItem('userEmail');

            // If no token is found, redirect to login or show an error
            if (!token) {
                setError('No token found. Please log in.');
                return;
            }

            const response = await axios.get(`http://localhost:5296/api/Category/all-categories/${email}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setCategories(response.data.categories);
        } catch (error) {
            console.error('Error fetching categories:', error);
        } finally {
            setLoading(false); // Set loading to false after categories are fetched
        }
    };

    // Update the status of a category by ID
    const handleStatusToggle = async (categoryId, currentStatus) => {
        try {
            const token = localStorage.getItem('token');

            // If no token is found, redirect to login or show an error
            if (!token) {
                setError('No token found. Please log in.');
                return;
            }

            // Call the API to update the category status
            await axios.put(`http://localhost:5296/api/Category/update-category-status/${categoryId}`, null, {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                params: {
                    isActive: !currentStatus
                }
            });

            // Update the categories list locally after the status change
            setCategories((prevCategories) =>
                prevCategories.map((category) =>
                    category.id === categoryId
                        ? { ...category, isActive: !currentStatus }
                        : category
                )
            );
        } catch (error) {
            console.error('Error updating category status:', error);
        }
    };

    return (
        <div className="container-fluid">
            <AdminHeader />

            {/* Show spinner while loading */}
            {loading ? (
                <div className="d-flex justify-content-center align-items-center mt-5">
                    <Spinner animation="border" role="status" variant="info">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            ) : (
                <div style={{ width: '80%', overflowX: 'auto', margin: '50px auto' }}>
                    <h3>Product Categories</h3> <br />

                    <Table striped bordered hover style={{ width: '100%' }}>
                        <thead>
                            <tr>
                                <th>Product Category</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map((category) => (
                                <tr key={category.id}>
                                    <td>{category.name}</td>
                                    <td>
                                        <Button
                                            variant={category.isActive ? "outline-success" : "outline-danger"}
                                            onClick={() => handleStatusToggle(category.id, category.isActive)}
                                        >
                                            {category.isActive ? "Active" : "Inactive"}
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

export default DisplayProductCategories;
