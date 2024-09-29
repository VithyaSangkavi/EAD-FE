import React from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCheckbox
}
  from 'mdb-react-ui-kit';
import CoverImage from '../assets/background-image.jpg'
import { Button, Container, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const navigate = useNavigate();
  return (
    // <div
    //   className='full-screen'
    //   style={{ backgroundImage: `url(${CoverImage})` }}
    // >
    //   <MDBContainer fluid>

    //     <MDBRow className='d-flex justify-content-center align-items-center h-100'>
    //       <MDBCol col='12'>

    //         <MDBCard className='bg-white my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '500px' }}>
    //           <MDBCardBody className='p-5 w-100 d-flex flex-column'>

    //             <h2 className="fw-bold mb-2 text-center">Sign in</h2>
    //             <p className="text-white-50 mb-3">Please enter your login and password!</p>

    //             <MDBInput wrapperClass='mb-4 w-100' label='Email address' id='formControlLg' type='email' size="lg" />
    //             <MDBInput wrapperClass='mb-4 w-100' label='Password' id='formControlLg' type='password' size="lg" />

    //             <MDBCheckbox name='flexCheck' id='flexCheckDefault' className='mb-4' label='Remember password' />

    //             {/* <MDBBtn size='lg'>
    //               Login
    //             </MDBBtn> */}

    //             <Button variant="info" className="mt-4 px-4 py-2 ms-3">
    //               Login
    //             </Button>

    //             <br />
    //             <div className="d-flex justify-content-between mx-4 mb-4">
    //               <a href="/signup">Already have an account?</a>
    //             </div>

    //           </MDBCardBody>
    //         </MDBCard>

    //       </MDBCol>
    //     </MDBRow>

    //   </MDBContainer>
    // </div>

    // <div
    //   className='full-screen'
    //   style={{ backgroundImage: `url(${CoverImage})` }}
    // >
    //   <MDBCard className='bg-white my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '500px' }}>
    //     <MDBCardBody className='p-5 w-100 d-flex flex-column'>
    //       <Form>
    //         <Form.Group className="mb-3" controlId="formBasicEmail">
    //           <Form.Label>Email address</Form.Label>
    //           <Form.Control type="email"/>

    //         </Form.Group>

    //         <Form.Group className="mb-3" controlId="formBasicPassword">
    //           <Form.Label>Password</Form.Label>
    //           <Form.Control type="password"/>
    //         </Form.Group>
    //         <Form.Group className="mb-3" controlId="formBasicCheckbox">
    //           <Form.Check type="checkbox" label="Check me out" />
    //         </Form.Group>
    //         {/* <Button variant="primary" type="submit">
    //           Submit
    //         </Button> */}

    //         <Button variant="info" className="mt-4 px-4 py-2 ms-3">
    //           Login
    //         </Button>
    //       </Form>

    //     </MDBCardBody>
    //   </MDBCard>
    // </div>

    <div
      className='full-screen'
      style={{ backgroundImage: `url(${CoverImage})` }}
    >
      <MDBContainer fluid>

        <MDBRow className='d-flex justify-content-center align-items-center h-100'>
          <MDBCol col='12'>

            <MDBCard className='bg-white my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '500px' }}>
              <MDBCardBody className='p-5 w-100 d-flex flex-column'>

                <h2 className="fw-bold mb-2 text-center">Sign in</h2>
                <p className="text-white-50 mb-3">Please enter your login and password!</p>

                <Form>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" />

                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                  </Form.Group>

                  <Button variant="info" className="mt-4 w-100" type="submit" onClick={() => navigate('/displayProducts')}>
                    Login
                  </Button>
                </Form>

                <br />
                <div className="d-flex justify-content-between mx-4 mb-4">
                  <a href="/signup">Already have an account?</a>
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