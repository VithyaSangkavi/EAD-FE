import { Container, Row, Col, Card } from 'react-bootstrap';
import CoverImage from '../../assets/background-image.jpg';

function AdminDashboard() {
  return (
    <div
      className="content-screen"
      style={{ backgroundImage: `url(${CoverImage})` }}
    >
      <Container className="">
        <Row>
          <Col>
            <h1>Admin Dashboard</h1>
            <Card className="mt-4">
              <Card.Body>
                <h2>Welcome, Admin!</h2>
                <p>
                  This is your dashboard where you can manage users, products,
                  orders, and more.
                </p>
                <ul>
                  <li>View and manage users</li>
                  <li>Manage products and categories</li>
                  <li>Handle customer orders</li>
                  <li>View inventory and low stock alerts</li>
                </ul>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default AdminDashboard;
