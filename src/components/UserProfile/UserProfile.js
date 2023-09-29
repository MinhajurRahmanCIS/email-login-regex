import React, { useContext } from 'react';
import Card from 'react-bootstrap/Card';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { AuthContext } from '../../providers/AuthProvider';



const UserProfile = () => {
    //Getting current logged user info from context API
    const { user, loading, logout } = useContext(AuthContext);

    console.log(user);

    //navigate to login page.
    const navigate = useNavigate();

    //Handling user to logout.
    const handelLogout = () => {

        //getting logout from context API.
        logout()
            .then(() => {
                
                //navigate to root(login).
                navigate('/');

                //Showing a message with toaster.
                toast.success('logout Successfully');
            })
            .catch(err => {
                console.log(err.message);
            })
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
                            <Link onClick={handelLogout} to='/' className='btn btn-danger text-white text-decoration-none'>Logout</Link>
                        </Card.Body>
                    </>
            }

        </Card>
    );
};

export default UserProfile;