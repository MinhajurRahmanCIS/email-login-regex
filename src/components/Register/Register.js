import React, { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link, useNavigate } from 'react-router-dom';
import RegisterImg from '../../assets/Register.jpg'
import { GiCrossedBones } from 'react-icons/gi';
import toast from 'react-hot-toast';
import { AuthContext } from '../../providers/AuthProvider';


const Register = () => {
    const { createUser, emailVerification, profileUpdate } = useContext(AuthContext);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handelRegister = event => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const img = form.img.value;
        const email = form.email.value;
        const password = form.password.value;
        setSuccess('');
        setError('');
        if (/(?=.*[!@#$&*])/.test(name)) {
            setError('You cannot use Special character on name');
            return
        }

        if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(email)) {
            setError('Please use valid Email!');
            return
        }


        if (!/(?=.*[A-Z])/.test(password)) {
            setError('Please add a uppercase letter');
            return
        }
        else if (!/(?=.*[a-x])/.test(password)) {
            setError('Please add a lowercase letter');
            return
        }
        else if (!/(?=.*[!@#$&*])/.test(password)) {
            setError('Please add a special character');
            return
        }
        else if (!/(?=.*[0-9])/.test(password)) {
            setError('Please add a one number');
            return
        }
        else if (password.length < 6) {
            setError('Please add 6 characters');
            return
        }

        createUser(email, password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                emailVerification()
                    .then(result => {
                        toast('Check your Email to verify your Account!', {
                            icon: '⚠️'
                        });
                    })
                    .catch(err => {
                        console.log(err);
                        setError(err.message);
                    })
                profileUpdate(name, img)
                    .then(() => {
                        setSuccess('Account Registered!');
                        navigate('/userProfile');
                    })
                    .catch(err => {
                        console.log(err.message);
                    })
                form.reset();
            })
            .catch(err => {
                console.log(err);
                setError(err.message);
            })
    }

    return (
        <Container>
            <Row className='flex-column-reverse flex-lg-row mt-5'>
                <Col className='container d-flex justify-content-center align-items-center'>
                    <img className='img-fluid' src={RegisterImg} alt="loginImage" />
                </Col>
                <Col className='container d-flex justify-content-center align-items-center m-5'>
                    <Form onSubmit={handelRegister} className='border rounded-4 p-5 border-success-subtle'>
                        <h1 className='text-success'>Please Register!</h1>

                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" name="name" placeholder="Enter Name" required />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicUrl">
                            <Form.Label>Image Url</Form.Label>
                            <Form.Control type="text" name="img" placeholder="Enter Image URL" required />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" name="email" placeholder="Enter Email" required />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name="password" placeholder="Enter Password" required />
                        </Form.Group>
                        <Form.Text className="text-muted">
                            <span className='d-flex'>Already Have Account!<Link className='ms-1 text-success' to='/'> Login Here</Link> </span>
                        </Form.Text>
                        <Button className='w-100 mt-2 btn btn-success' variant="primary" type="submit">
                            Submit
                        </Button>

                        <p className='text-success text-center mt-2'>{success}</p>
                        <p className='text-danger text-center mt-2'> {error === '' ? '' : <><GiCrossedBones /> {error}</>}</p>
                    </Form>
                </Col>
            </Row>

        </Container>
    );
};

export default Register;