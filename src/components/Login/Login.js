import React, { useContext, useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link, useNavigate } from 'react-router-dom';
import loginImg from '../../assets/Login.jpg'
import toast from 'react-hot-toast';
import { AuthContext } from '../../providers/AuthProvider';


const Login = () => {
    //Using context API to get login and passwordReset from AuthProvider.
    const { login, passwordReset } = useContext(AuthContext);

    //Using useState to store errors.
    const [error, setError] = useState('');

    //Using useState to store success message;
    const [success, setSuccess] = useState('');

    //using useRef to get the email to handel the password reset. 
    const emailRef = useRef();

    //using useNavigate to navigate to other page.
    const navigate = useNavigate();

    //Taking user email and password from form when click on Login.
    const handelRegister = event => {

        //Using prevent Default to stop refreshing page.When clicking on register button.
        event.preventDefault();

        //Taking the event.target as form. To use it in short.
        const form = event.target;

        //Taking email address from email input field.
        const email = form.email.value;

        //Taking password value from password input field.
        const password = form.password.value;

        //set success as empty.
        setSuccess('');

        //set error as empty.
        setError('');

        //getting login from context API. 
        login(email, password)
            .then(result => {

                //taking user in loggedUser;
                const loggedUser = result.user;
                console.log(loggedUser);

                //Showing success message in state.
                setSuccess('Login Success');

                //navigate to userProfile page.
                navigate('/userProfile');

                //Showing a message with toaster.
                toast.success('Login Successful');

                //After clicking on login button input user email password will be clear from input field.
                form.reset();
            })
            .catch(err => {
                console.log(err);
                //If error occur setting the error message on error state.
                setError(err.message);
            })
    }

    //Taking only user email from when click on reset.
    const resetPassword = event => {

        //taking email from emailRef.
        const email = emailRef.current.value;

        //A condition when user blank the email field and press the reset. 
        if (!email) {
            alert("Provide Email address to reset password!");
        }

        //getting passwordReset from context API.
        passwordReset(email)
            .then(result => {
                toast.success('Password Reset !! Check your email');
            })
            .catch(err => {
                console.log(err);

                //If error occur setting the error message on error state.
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