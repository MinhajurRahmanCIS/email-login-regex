import { getAuth, signOut } from 'firebase/auth';
import React from 'react';
import Card from 'react-bootstrap/Card';
import app from '../../firebase/firebase.config';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const auth = getAuth(app);

const UserProfile = () => {
    const user = auth.currentUser;
    const navigate = useNavigate();
    
    const handelLogout = () => {
        signOut(auth.currentUser)
        .then(() => {
            navigate('/');
            toast.success('logout Successfully');
        })
        .catch()
    }
    return (
        <Card className='container d-flex flex-md-column flex-lg-row justify-content-center align-items-center mt-5 w-50 h-50'>
            <Card.Img className='img-fluid w-50 h-25 rounded' variant="top" src={ user === null ? '' : user.photoURL} />
            <Card.Body>
                <Card.Title>{ user === null ? '' : user.displayName}</Card.Title>
                    <p className='pt-0'><b>Email</b>: <span className='text-success'>{user === null ? '' : user.email}</span></p>
                    <p className='pt-0'><b>Account</b> : {user === null ? '' : user.emailVerified === false  ? <span className='text-danger'>Not Verified</span>  : <span className='text-success'>Verified</span>}</p>
                    <p><b>Account Creation</b> : <span className='text-primary'>{user === null ? '' : user.metadata.creationTime}</span></p>
                <Link onClick={handelLogout} to='/' className='btn btn-primary text-white text-decoration-none'>Logout</Link>
            </Card.Body>
        </Card>
    );
};

export default UserProfile;