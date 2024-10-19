import { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Alert, Spinner, Modal } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './VendorInventoryManagement.css'; // Import custom CSS

function VendorInventoryManagement() {
  const [products, setProducts] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [lowStockFilter, setLowStockFilter] = useState(false); // State to toggle low stock filter

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem('token');
        const userEmail = localStorage.getItem('userEmail');

        if (!token || !userEmail) {
          return;
        }

        const response = await axios.get(
          `http://localhost:5296/api/Inventory/user/${userEmail}/products`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setProducts(response.data);
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching products:', err);
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleRemoveStock = (productId) => {
    setSelectedProductId(productId);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(
        `http://localhost:5296/api/Product/delete-product/${selectedProductId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(response.data.Message || 'Product deleted successfully', {
        position: 'top-right',
        autoClose: 3000,
      });

      // Update product list after deletion
      setProducts((prevProducts) => {
        const updatedProducts = { ...prevProducts };
        Object.keys(updatedProducts).forEach((category) => {
          updatedProducts[category].products = updatedProducts[
            category
          ].products.filter((product) => product.id !== selectedProductId);
        });
        return updatedProducts;
      });

      setShowModal(false);
      setSelectedProductId(null);
    } catch (err) {
      console.error('Error deleting product:', err);
      toast.error(err.response?.data?.Message || 'Error deleting product', {
        position: 'top-right',
        autoClose: 3000,
      });

      setShowModal(false);
      setSelectedProductId(null);
    }
  };

  const cancelDelete = () => {
    setShowModal(false);
    setSelectedProductId(null);
  };

  // Filter low stock products
  const filterLowStockProducts = () => {
    setLowStockFilter(!lowStockFilter);
  };

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center mt-5">
        <Spinner animation="border" role="status" variant="info">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  const filteredProducts = lowStockFilter
    ? Object.entries(products).reduce((acc, [categoryName, categoryInfo]) => {
        const lowStockProducts = categoryInfo.products.filter(
          (product) => product.stockQuantity < 10
        );
        if (lowStockProducts.length > 0) {
          acc[categoryName] = { ...categoryInfo, products: lowStockProducts };
        }
        return acc;
      }, {})
    : products;

  return (
    <div>
      <ToastContainer />
      <Modal show={showModal} onHide={cancelDelete} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this product?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cancelDelete}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>

      {products && Object.keys(products).length > 0 ? (
        <div className="container mt-5">
          <div className="d-flex justify-content-between align-items-center">
            <h2 className="table-title">Vendor Inventory Management</h2>
            <Button
              variant="primary"
              onClick={filterLowStockProducts}
              className="filter-btn"
            >
              {lowStockFilter ? 'Show All Products' : 'Filter Low Stock'}
            </Button>
          </div>

          <Table className="custom-table" responsive>
            <thead className="custom-table-header">
              <tr>
                <th>Product Name</th>
                <th>Category</th>
                <th>Stock Quantity</th>
                <th>Low Stock Alert</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(filteredProducts).map(
                ([categoryName, categoryInfo]) =>
                  categoryInfo.products.map((product) => (
                    <tr key={product.id}>
                      <td>{product.name || 'No Name'}</td>
                      <td>{categoryName}</td>
                      <td>{product.stockQuantity || 'N/A'}</td>
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
            </tbody>
          </Table>
        </div>
      ) : (
        <p>No inventory available</p>
      )}
    </div>
  );
}

export default VendorInventoryManagement;
