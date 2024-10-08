import { useState } from 'react';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBRadio,
} from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify'; // Import Toast
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS

function SignupPage() {
  const navigate = useNavigate();
  const [userType, setUserType] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    address: '',
    phoneNumber: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleUserTypeChange = (value) => {
    setUserType(value);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check if password and confirmPassword match
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('Passwords do not match!');
      return;
    }

    // Check if Address and Phone Number are provided
    if (!formData.address || !formData.phoneNumber) {
      setErrorMessage('Address and Phone Number are required!');
      return;
    }

    // Sanitize the username to remove invalid characters (like spaces)
    const sanitizedUserName =
      formData.firstName.replace(/[^a-zA-Z0-9]/g, '') +
      formData.lastName.replace(/[^a-zA-Z0-9]/g, '');

    const userSignUpData = {
      UserName: sanitizedUserName,
      Email: formData.email,
      Password: formData.password,
      Role: userType,
      State: 'active',
      Address: formData.address,
      PhoneNumber: formData.phoneNumber,
    };

    try {
      const response = await axios.post(
        'http://localhost:5296/api/Auth/signup',
        userSignUpData
      );
      if (response.status === 200) {
        toast.success('Signup successful!', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        navigate('/login');
      }
    } catch (error) {
      toast.error(
        error.response?.data?.Message || 'An error occurred during signup',
        {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
    }
  };

  return (
    <div
      className="full-screen"
      style={{ backgroundImage: `url(../assets/background-image.jpg)` }}
    >
      <MDBContainer fluid>
        <ToastContainer />
        <MDBRow className="d-flex justify-content-center align-items-center h-100">
          <MDBCol col="12">
            <MDBCard
              className="bg-white my-5 mx-auto"
              style={{ borderRadius: '1rem', maxWidth: '500px' }}
            >
              <MDBCardBody className="p-4 w-100 d-flex flex-column">
                <h2 className="fw-bold mb-2 text-center">Sign Up</h2>
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="firstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="lastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

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

                  <Form.Group className="mb-3" controlId="confirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      type="password"
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="address">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      type="text"
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="phoneNumber">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                      type="text"
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <div className="mb-4">
                    <Form.Label>User Role</Form.Label>
                    <br />
                    <MDBRadio
                      name="userType"
                      id="admin"
                      label="Admin"
                      inline
                      checked={userType === 'admin'}
                      onChange={() => handleUserTypeChange('admin')}
                    />
                    <MDBRadio
                      name="userType"
                      id="csr"
                      label="CSR"
                      inline
                      checked={userType === 'csr'}
                      onChange={() => handleUserTypeChange('csr')}
                    />
                  </div>

                  <Button variant="info" className="mt-4 w-100" type="submit">
                    Create Account
                  </Button>
                </Form>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}

export default SignupPage;
