import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Bar, Line, Pie } from 'react-chartjs-2';
import axios from 'axios';
import { Chart, CategoryScale, LinearScale, BarElement, LineElement, Title, PointElement, ArcElement } from 'chart.js';

// Register Chart.js components
Chart.register(CategoryScale, LinearScale, BarElement, Title, LineElement, PointElement, ArcElement);

function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]); // Added state for categories
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products from the API
  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No token found. Please log in.');
        return;
      }

      const response = await axios.get(
        'http://localhost:5296/api/Product/all-products',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Error fetching products');
    } finally {
      setLoading(false);
    }
  };

  // Fetch users from the API
  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        'http://localhost:5296/api/UserManagement/all-users',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUsers(response.data);
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  };

  // Fetch categories from the API
  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem('token');
      const email = localStorage.getItem('userEmail');

      if (!token) {
        setError('No token found. Please log in.');
        return;
      }

      const response = await axios.get(`http://localhost:5296/api/Category/all-categories/${email}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCategories(response.data.categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  // Group products by category name
  const getCategoryData = () => {
    const categoryCounts = products.reduce((acc, product) => {
      const categoryName = product.category.name;
      acc[categoryName] = (acc[categoryName] || 0) + 1;
      return acc;
    }, {});

    return {
      labels: Object.keys(categoryCounts),
      data: Object.values(categoryCounts),
    };
  };

  // Group users by their state (active/inactive)
  const getUserStateData = () => {
    const stateCounts = users.reduce(
      (acc, user) => {
        const state = user.state === 'active' ? 'Active' : 'Inactive';
        acc[state] = (acc[state] || 0) + 1;
        return acc;
      },
      { Active: 0, Inactive: 0 }
    );

    return {
      labels: Object.keys(stateCounts),
      data: Object.values(stateCounts),
    };
  };

  // Group categories by active/inactive status
  const getCategoryStatusData = () => {
    const categoryStatusCounts = categories.reduce(
      (acc, category) => {
        const status = category.isActive ? 'Active' : 'Inactive';
        acc[status] = (acc[status] || 0) + 1;
        return acc;
      },
      { Active: 0, Inactive: 0 }
    );

    return {
      labels: Object.keys(categoryStatusCounts),
      data: Object.values(categoryStatusCounts),
    };
  };

  useEffect(() => {
    fetchProducts();
    fetchUsers();
    fetchCategories(); // Fetch categories as well
  }, []);

  const productChartData = getCategoryData();
  const userChartData = getUserStateData();
  const categoryChartData = getCategoryStatusData(); // Category chart data

  // Bar chart for products by category
  const productData = {
    labels: productChartData.labels,
    datasets: [
      {
        label: 'Number of Products',
        data: productChartData.data,
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 99, 132, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(153, 102, 255, 0.6)',
        ],
      },
    ],
  };

  // Line chart for users by state
  const userStateData = {
    labels: userChartData.labels,
    datasets: [
      {
        label: 'Number of Users',
        data: userChartData.data,
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
        fill: true,
      },
    ],
  };

  // Pie chart for categories by status
  const categoryStatusData = {
    labels: categoryChartData.labels,
    datasets: [
      {
        label: 'Category Status',
        data: categoryChartData.data,
        backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'],
      },
    ],
  };

  // Pie chart options
  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      }
    },
  };

  return (
    <div>
      <Container>
        <Row>
          <Col>
            <Card className="mt-4">
              <Card.Body>
                <h3>Welcome, Admin!</h3>
                <p>This is your dashboard where you can manage users, products, orders, and more.</p>
              </Card.Body>
            </Card>
            {loading && <p>Loading data...</p>}
            {error && <p>{error}</p>}
            {!loading && !error && (
              <div>
                <Row className="mt-4">
                  <Col md={6}>
                    <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', width: '100%', height: '300px' }}>
                      <h4>Product Categories</h4>
                      <Bar data={productData} options={{ responsive: true }} />
                    </div>
                  </Col>
                  <Col md={6}>
                    <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', width: '100%', height: '300px' }}>
                      <h4>User States</h4>
                      <Line data={userStateData} options={{ responsive: true }} />
                    </div>
                  </Col>
                </Row>
                <Row className="mt-4">
                  <Col md={6}>
                    <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', width: '100%', height: '200px' }}>
                      <h4>Category Status</h4>
                      <Pie style={{marginBottom: '20px'}} data={categoryStatusData} options={pieOptions} />
                    </div>
                  </Col>
                </Row>
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default AdminDashboard;
