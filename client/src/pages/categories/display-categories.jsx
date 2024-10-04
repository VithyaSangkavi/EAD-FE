import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import AdminHeader from '../../components/admin-header';
import '../vendors/vendors.css';
import '../../app.css';
import { Button } from 'react-bootstrap';
import axios from 'axios';

function DisplayProductCategories() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetchCategories();
    }, []);

    // Fetch categories from the API
    const fetchCategories = async () => {
        try {
            const response = await axios.get('http://localhost:5296/api/Category/all-categories/fahmi@test.com', {
                headers: {
                    'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJjOWI1YjUwYi04ODBhLTQ3NjgtYjg1ZC1iZmQ1Njc0ZTAwOTciLCJ1bmlxdWVfbmFtZSI6IkZhaG1pTmV3MSIsImVtYWlsIjoiZmFobWlAdGVzdC5jb20iLCJyb2xlIjpbIlVzZXIiLCJDU1IiLCJBZG1pbiIsIlZlbmRvciJdLCJuYmYiOjE3MjgwNjUxOTYsImV4cCI6MTcyODA2ODc5NiwiaWF0IjoxNzI4MDY1MTk2LCJpc3MiOiJFQUQiLCJhdWQiOiJDdXN0b21lcnMifQ.PEu6Gc6v3rK_TcjASLCo0ek_g_fBoeZjdgbP1wYOezE`
                }
            });
            setCategories(response.data.categories); 
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    // Update the status of a category by ID
    const handleStatusToggle = async (categoryId, currentStatus) => {
        try {
            // Call the API to update the category status
            await axios.put(`http://localhost:5296/api/Category/update-category-status/${categoryId}`, null, {
                headers: {
                    'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJjOWI1YjUwYi04ODBhLTQ3NjgtYjg1ZC1iZmQ1Njc0ZTAwOTciLCJ1bmlxdWVfbmFtZSI6IkZhaG1pTmV3MSIsImVtYWlsIjoiZmFobWlAdGVzdC5jb20iLCJyb2xlIjpbIlVzZXIiLCJDU1IiLCJBZG1pbiIsIlZlbmRvciJdLCJuYmYiOjE3MjgwNjUxOTYsImV4cCI6MTcyODA2ODc5NiwiaWF0IjoxNzI4MDY1MTk2LCJpc3MiOiJFQUQiLCJhdWQiOiJDdXN0b21lcnMifQ.PEu6Gc6v3rK_TcjASLCo0ek_g_fBoeZjdgbP1wYOezE`
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

            <div style={{ width: '80%', overflowX: 'auto', margin: '100px auto' }}>
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
        </div>
    );
}

export default DisplayProductCategories;
