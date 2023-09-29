import React, { useContext } from 'react';
import Card from 'react-bootstrap/Card';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { AuthContext } from '../../providers/AuthProvider';



const UserProfile = () => {
    const { user, loading, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const handelLogout = () => {
        logout()
            .then(() => {
                navigate('/');
                toast.success('logout Successfully');
            })
            .catch()
    }
    return (
        <Card className='container d-flex flex-md-column flex-lg-row justify-content-center align-items-center mt-5 w-50 h-50'>
            {
                loading === true ?
                    <div className="d-flex justify-content-center p-5">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                    :
                    <>
                        <Card.Img className='img-fluid w-50 h-25 rounded' variant="top" src={user.photoURL} />
                        <Card.Body>
                            <Card.Title>{user.displayName}</Card.Title>
                            <p className='pt-0'><b>Email</b>: <span className='text-success'>{user.email}</span></p>
                            <p className='pt-0'><b>Account</b> : {user.emailVerified === false ? <span className='text-danger'>Not Verified</span> : <span className='text-success'>Verified</span>}</p>
                            <p><b>Account Creation</b> : <span className='text-primary'>{user.metadata.creationTime}</span></p>
                            <Link onClick={handelLogout} to='/' className='btn btn-primary text-white text-decoration-none'>Logout</Link>
                        </Card.Body>
                    </>
            }

        </Card>
    );
};

export default UserProfile;