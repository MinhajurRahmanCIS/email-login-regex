import React, { useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link, useNavigate } from 'react-router-dom';
import loginImg from '../../assets/Login.jpg'
import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import app from '../../firebase/firebase.config';
import toast from 'react-hot-toast';

const auth = getAuth(app);
const Login = () => {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const emailRef = useRef();
    const navigate = useNavigate();

    const handelRegister = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        setSuccess('');
        setError('');

        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                setSuccess('Login Success');
                navigate('/userProfile');
                toast.success('Login Successful');
                form.reset();
            })
            .catch(err => {
                console.log(err);
                setError(err.message);
            })
    }
    const resetPassword = event => {
        const email = emailRef.current.value;
        if(!email){
            alert("Provide Email address to reset password!")
        }
        sendPasswordResetEmail(auth, email)
            .then(result => {
                alert('Password Reset !! Check your email')
            })
            .catch(err => {
                console.log(err);
                setError(err.message);
            })
    }
    return (
        <Container>
            <Row className='flex-column-reverse flex-lg-row mt-5'>
                <Col className='container d-flex justify-content-center align-items-center '>
                    <Form onSubmit={handelRegister} className='border rounded-4 p-5 border-primary-subtle'>
                        <h1 className='text-primary'>Please Login!</h1>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" name="email" ref={emailRef} placeholder="Enter Email" required />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name="password" placeholder="Enter Password" required />
                        </Form.Group>
                        <Form.Text className="text-muted">
                            <span className='d-flex'>Haven't Account?<Link className='ms-1 text-primary' to='/register'> Register Here</Link></span>
                        </Form.Text>
                        <Button className='w-100 mt-2' variant="primary" type="submit">
                            Submit
                        </Button>
                        <p className='mt-1'>Forget your password.<span onClick={resetPassword} className='link link-primary ms-1'>Reset</span></p>
                        <p className='mt-2 text-success text-center'>{success}</p>
                        <p className='mt-2 text-danger text-center'>{error}</p>
                    </Form>

                </Col>
                <Col className='container d-flex justify-content-center align-items-center'>
                    <img className='img-fluid' src={loginImg} alt="loginImage" />
                </Col>
            </Row>

        </Container>
    );
};

export default Login;