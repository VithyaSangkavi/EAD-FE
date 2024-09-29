import React from 'react';
import { Container, Button } from 'react-bootstrap';
import '../styles/landing-page.css';
// import CoverImage from '../assets/banner.jpg'
import CoverImage from '../assets/background-image.jpg'
import { useNavigate } from 'react-router-dom';
import AdminHeader from '../components/admin-header';

const LandingPage = () => {
    const navigate = useNavigate(); 

    return (
        <div
            className='full-screen'
            style={{ backgroundImage: `url(${CoverImage})` }}
        >
            <AdminHeader></AdminHeader>
            <Container>
                <div className="text-center animated fadeInDown">
                    <h2 className="header">
                        <b>Hello!</b>
                        <small className="nthsmall-one"> there</small>
                        <br />
                        <small className="nthsmall-two">Welcome to Ecommerce Systems</small>
                        <br/>
                        <small className="small-heading">Backoffice Work</small>
                    </h2>
                    <Button variant="outline-info" className="mt-4 px-4 py-2"  onClick={() => navigate('/login')}>
                        Continue to login
                    </Button>
                    <Button variant="outline-info" className="mt-4 px-4 py-2 ms-3"  onClick={() => navigate('/signup')}>
                        Signup
                    </Button>
                </div>
            </Container>
        </div>
    );
};

export default LandingPage;
