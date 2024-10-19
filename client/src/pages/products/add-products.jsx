import Button from 'react-bootstrap/Button';
import AdminHeader from '../../components/admin-header';
import { Form } from 'react-bootstrap';
import CoverImage from '../../assets/background-image.jpg';
import React, { useEffect, useState } from 'react';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody
} from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AddProducts() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    price: 0,
    description: '',
    stockQuantity: 0,
    category: '',
    productPicture: null,
    addedByUserEmail: ''
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          productPicture: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCategoryChange = (e) => {
    setFormData({
      ...formData,
      category: e.target.value,
    });
  };

  //Add new product
  const addProduct = async (e) => {

    const email = localStorage.getItem('userEmail');

    e.preventDefault();

    const productData = new FormData();
    productData.append('name', formData.name);
    productData.append('price', formData.price);
    productData.append('description', formData.description);
    productData.append('stockQuantity', formData.stockQuantity);
    productData.append('category', formData.category);
    productData.append('productPicture', formData.productPicture);
    productData.append('addedByUserEmail', email);

    try {
      // Get token from localStorage (make sure it's stored when the user logs in)
      const token = localStorage.getItem('token');

      // If no token is found, redirect to login or show an error
      if (!token) {
        setError('No token found. Please log in.');
        return;
      }

      await axios.post('http://localhost:5296/api/Product/add-product', productData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      navigate('/displayProducts');
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Fetch categories from the API
  const fetchCategories = async () => {
    try {
      // Get token from localStorage (make sure it's stored when the user logs in)
      const token = localStorage.getItem('token');

      //get email from local storage
      const email = localStorage.getItem('userEmail');

      // If no token is found, redirect to login or show an error
      if (!token) {
        setError('No token found. Please log in.');
        return;
      }

      const response = await axios.get(`http://localhost:5296/api/Category/all-categories/${email}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setCategories(response.data.categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  return (
    <div
      className='full-screen-add'
      style={{ backgroundImage: `url(${CoverImage})` }}
    >
      <AdminHeader />

      <MDBContainer fluid>
        <MDBRow className='d-flex justify-content-center align-items-center h-100'>
          <MDBCol>
            <MDBCard className='bg-white my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '500px' }}>
              <MDBCardBody className='p-3 w-100 d-flex flex-column'>
                <h4 className="form-heading">Add New Product</h4>

                <Form onSubmit={addProduct}>
                  <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Product Name</Form.Label>
                    <Form.Control type="text" value={formData.name} onChange={handleInputChange} />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="price">
                    <Form.Label>Price</Form.Label>
                    <Form.Control type="number" value={formData.price} onChange={handleInputChange} />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="text" value={formData.description} onChange={handleInputChange} />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="stockQuantity">
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control type="number" value={formData.stockQuantity} onChange={handleInputChange} />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="category">
                    <Form.Label>Category</Form.Label>
                    <Form.Control
                      as="select"
                      value={formData.category}
                      onChange={handleCategoryChange}
                    >
                      <option value="">Select a category</option>
                      {categories.map(category => (
                        category.isActive && (
                          <option key={category.id} value={category.id}>
                            {`${category.id} - ${category.name}`}
                          </option>
                        )
                      ))}
                    </Form.Control>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="productPicture">
                    <Form.Label>Product Image</Form.Label>
                    <Form.Control type="file" accept="image/*" onChange={handleFileChange} />
                  </Form.Group>

                  <Button variant="outline-success" className="mt-4 w-100" type="submit">
                    Add Product
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

export default AddProducts;