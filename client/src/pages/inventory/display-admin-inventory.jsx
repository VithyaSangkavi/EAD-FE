import { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Alert, Spinner, Modal } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './AdminInventoryManagement.css'; // Import custom CSS

function AdminInventoryManagement() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [showLowStockOnly, setShowLowStockOnly] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          return;
        }

        const response = await axios.get(
          'http://localhost:5296/api/Inventory/admin/products',
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

      setProducts((prevProducts) =>
        prevProducts.map((userProduct) => {
          const updatedCategories = Object.entries(
            userProduct.categories
          ).reduce((acc, [categoryName, categoryInfo]) => {
            const filteredProducts = categoryInfo.products.filter(
              (product) => product.id !== selectedProductId
            );

            if (filteredProducts.length > 0) {
              acc[categoryName] = {
                ...categoryInfo,
                products: filteredProducts,
              };
            }
            return acc;
          }, {});

          return { ...userProduct, categories: updatedCategories };
        })
      );

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

  const getFilteredProducts = () => {
    if (!showLowStockOnly) {
      return products;
    }

    return products.map((userProduct) => ({
      ...userProduct,
      categories: Object.fromEntries(
        Object.entries(userProduct.categories).map(
          ([categoryName, categoryInfo]) => [
            categoryName,
            {
              ...categoryInfo,
              products: categoryInfo.products.filter(
                (product) => product.stockQuantity < 10
              ),
            },
          ]
        )
      ),
    }));
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

  const filteredProducts = getFilteredProducts();

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

      {products.length > 0 ? (
        <div className="container mt-5">
          <h2 style={{ marginTop: '100px', paddingBottom: '20px' }}>
            Admin Inventory Management
          </h2>

          {/* Row for button */}
          <div className="d-flex justify-content-between mb-3">
            <Button
              variant="primary"
              onClick={() => setShowLowStockOnly(!showLowStockOnly)}
              className="ms-auto"
            >
              {showLowStockOnly
                ? 'Show All Products'
                : 'Show Low Stock Products'}
            </Button>
          </div>

          <Table responsive bordered hover className="custom-table">
            <thead className="custom-thead">
              <tr>
                <th>Product Name</th>
                <th>Category</th>
                <th>Stock Quantity</th>
                <th>Low Stock Alert</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((userProduct) =>
                Object.entries(userProduct.categories).map(
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
                )
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

export default AdminInventoryManagement;
