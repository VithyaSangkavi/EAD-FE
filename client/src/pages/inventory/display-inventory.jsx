import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Alert } from 'react-bootstrap';
import AdminHeader from '../../components/admin-header';

function InventoryManagement() {
  const [products, setProducts] = useState([]);

  const [error, setError] = useState('');

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Get token from localStorage (make sure it's stored when the user logs in)
        const token = localStorage.getItem('token');

        // If no token is found, redirect to login or show an error
        if (!token) {
          setError('No token found. Please log in.');

          return;
        }

        // Make request with Authorization header
        const response = await axios.get(
          'http://localhost:5296/api/Inventory/admin/products',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log('Products Data:', response.data);
        setProducts(response.data);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError(
          'Failed to load products. Please make sure you are authorized.'
        );
      }
    };

    fetchProducts();
  }, []);

  const handleRemoveStock = async (productId) => {
    console.log('Removing stock for product with ID:', productId);
    // Here, you'd send a request to your API to remove stock from the inventory.
  };

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <AdminHeader />
      <div className="container mt-5">
        <h2>Inventory Management</h2>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Category</th>
              <th>Stock Quantity</th>
              <th>Low Stock Alert</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((userProduct) => (
              <React.Fragment key={userProduct.user}>
                {Object.entries(userProduct.categories).map(
                  ([categoryName, categoryInfo]) =>
                    categoryInfo.products.map((product) => (
                      <tr key={product.id}>
                        <td>{product.name || 'No Name'}</td>{' '}
                        {/* Display product name */}
                        <td>{categoryName}</td> {/* Display category name */}
                        <td>{product.stockQuantity || 'N/A'}</td>{' '}
                        {/* Display stock quantity */}
                        <td>
                          {product.stockQuantity < 10 ? (
                            <Alert variant="danger">Low Stock</Alert>
                          ) : (
                            'In Stock'
                          )}
                        </td>
                        <td>
                          <Button
                            variant="warning"
                            onClick={() => handleRemoveStock(product.id)}
                            disabled={product.stockQuantity === 0}
                          >
                            Remove Stock
                          </Button>
                        </td>
                      </tr>
                    ))
                )}
              </React.Fragment>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default InventoryManagement;
