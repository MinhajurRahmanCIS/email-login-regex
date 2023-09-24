import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <Navbar collapseOnSelect expand="lg" className="border-bottom border-light-subtle bg-body-tertiary p-3">
            <Container>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="container d-flex justify-content-center">
                        <Link className='nav-link' to='/'> Login</Link>
                        <Link className='nav-link' to='/register'> Register</Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;