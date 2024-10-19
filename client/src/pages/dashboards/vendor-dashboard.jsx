import { Container, Row, Col, Card, Spinner } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import axios from 'axios';
import CoverImage from '../../assets/background-image.jpg';

function VendorDashboard() {
  const [lowStockNotifications, setLowStockNotifications] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchLowStockNotifications = async () => {
      try {
        const token = localStorage.getItem('token');
        const userEmail = localStorage.getItem('userEmail');
        const storedRoles = JSON.parse(localStorage.getItem('roles')) || [];

        let apiUrl = '';
        if (storedRoles.includes('Vendor')) {
          apiUrl = `http://localhost:5296/api/Inventory/user/${userEmail}/products`;
        } else if (
          storedRoles.includes('Admin') ||
          storedRoles.includes('CSR')
        ) {
          apiUrl = 'http://localhost:5296/api/Inventory/admin/products';
        } else {
          return;
        }

        const response = await axios.get(apiUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Extract low stock notifications
        const notifications = [];
        Object.entries(response.data).forEach(
          ([categoryName, categoryInfo]) => {
            categoryInfo.products.forEach((product) => {
              if (product.stockQuantity < 10) {
                notifications.push({
                  productName: product.name,
                  stockQuantity: product.stockQuantity,
                  timeStamp: new Date().toLocaleString(), // Example timestamp
                  category: categoryName,
                });
              }
            });
          }
        );

        setLowStockNotifications(notifications);
      } catch (err) {
        console.error('Error fetching low stock notifications:', err);
      } finally {
        setLoading(false); // Set loading to false when data is fetched
      }
    };

    fetchLowStockNotifications();
  }, []);

  return (
    <div
      className="content-screen"
      style={{ backgroundImage: `url(${CoverImage})` }}
    >
      <Container>
        <Row>
          <Col>
            <h1 style={{ paddingTop: '20px' }}>Vendor Dashboard</h1>
            <Card className="mt-4">
              <Card.Body>
                <h2>Welcome, Vendor!</h2>
                <p>
                  This is your dashboard where you can manage your products,
                  view inventory, and receive notifications.
                </p>
                <ul>
                  <li>Manage your products and categories</li>
                  <li>View your orders and shipping status</li>
                  <li>Check inventory and stock levels</li>
                  <li>Receive notifications on low stock or new orders</li>
                </ul>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Loading spinner */}
        {loading ? (
          <div className="d-flex justify-content-center align-items-center mt-5">
            <Spinner animation="border" role="status" variant="info">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : (
          <Row className="mt-5">
            <Col>
              <h2>Low Stock Notifications</h2>
              {lowStockNotifications.length > 0 ? (
                lowStockNotifications.map((notification, index) => (
                  <Card key={index} className="mb-3">
                    <Row noGutters>
                      <Col md={2} className="bg-warning text-center p-3">
                        <h5>
                          {new Date(
                            notification.timeStamp
                          ).toLocaleDateString()}
                        </h5>
                        <p>
                          {new Date(
                            notification.timeStamp
                          ).toLocaleTimeString()}
                        </p>
                      </Col>
                      <Col md={10}>
                        <Card.Body>
                          <Card.Title>
                            {notification.productName} (
                            {notification.stockQuantity} units left)
                          </Card.Title>
                          <Card.Text>
                            Category: {notification.category}
                          </Card.Text>
                          <Card.Text>
                            <small className="text-muted">
                              Received on: {notification.timeStamp}
                            </small>
                          </Card.Text>
                        </Card.Body>
                      </Col>
                    </Row>
                  </Card>
                ))
              ) : (
                <p>No low stock notifications available</p>
              )}
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
}

export default VendorDashboard;
