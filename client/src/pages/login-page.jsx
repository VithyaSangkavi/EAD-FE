import { useState } from 'react';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
} from 'mdb-react-ui-kit';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import Axios
import { ToastContainer, toast } from 'react-toastify'; // Import Toastify for notifications
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS

import CoverImage from '../assets/background-image.jpg';

function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  // Handle form submit (login logic)
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare login data
    const loginData = {
      Email: formData.email,
      Password: formData.password,
    };

    try {
      // Send POST request to backend
      const response = await axios.post(
        'http://localhost:5296/api/Auth/login',
        loginData
      );
      if (response.status === 200) {
        // Show success toast notification
        toast.success('Login successful!', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        // Save the token in local storage
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userEmail', response.data.user.email);

        // Save user roles in local storage
        const userRoles = response.data.user.roles;
        localStorage.setItem('roles', JSON.stringify(userRoles));

        // Determine the highest-priority role for redirection
        const rolePriority = ['Admin', 'CSR', 'Vendor', 'User']; // Define the role priority

        // Find the highest-priority role that the user has
        const userPrimaryRole = rolePriority.find((role) =>
          userRoles.includes(role)
        );

        console.log('Token:', response.data.token);
        console.log('Email:', response.data.user.email);
        console.log('Roles:', userRoles);
        console.log('Primary Role:', userPrimaryRole);

        // Redirect user based on their primary role
        if (userPrimaryRole === 'Admin') {
          navigate('/admin-dashboard'); // Redirect to Admin Dashboard
        } else if (userPrimaryRole === 'CSR') {
          navigate('/csr-dashboard'); // Redirect to Vendor Dashboard
        } else if (userPrimaryRole === 'Vendor') {
          navigate('/vendor-dashboard'); // Redirect to Vendor Dashboard
        } else {
          navigate('/displayProducts'); // Default redirection
        }
      }
    } catch (error) {
      // Show error toast notification
      toast.error(error.response?.data?.Message || 'Login failed', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div
      className="full-screen"
      style={{ backgroundImage: `url(${CoverImage})` }}
    >
      <MDBContainer fluid>
        <ToastContainer /> {/* Toast container for showing notifications */}
        <MDBRow className="d-flex justify-content-center align-items-center h-100">
          <MDBCol col="12">
            <MDBCard
              className="bg-white my-5 mx-auto"
              style={{ borderRadius: '1rem', maxWidth: '500px' }}
            >
              <MDBCardBody className="p-5 w-100 d-flex flex-column">
                <h2 className="fw-bold mb-2 text-center">Sign in</h2>
                <p className="text-white-50 mb-3">
                  Please enter your login and password!
                </p>

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Remember me" />
                  </Form.Group>

                  <Button variant="info" className="mt-4 w-100" type="submit">
                    Login
                  </Button>
                </Form>

                <br />
                <div className="d-flex justify-content-between mx-4 mb-4">
                  <a href="/signup">Don&#39;t have an account? Sign Up</a>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}

export default LoginPage;
