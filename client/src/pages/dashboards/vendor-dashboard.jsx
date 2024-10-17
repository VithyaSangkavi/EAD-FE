import { Container, Row, Col, Card } from 'react-bootstrap';
import CoverImage from '../../assets/background-image.jpg';

function VendorDashboard() {
  return (
    <div
      className="content-screen"
      style={{ backgroundImage: `url(${CoverImage})` }}
    >
      <Container>
        <Row>
          <Col>
            <h1>Vendor Dashboard</h1>
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
      </Container>
    </div>
  );
}

export default VendorDashboard;
