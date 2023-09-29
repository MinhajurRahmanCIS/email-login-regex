import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header/Header';
import { Toaster } from 'react-hot-toast';
import { AuthContext } from '../providers/AuthProvider';
const Main = () => {
    const { user } = useContext(AuthContext);

    return (
        <div>
            {user ?
                <> </>
                :
                <Header></Header>}
            <Toaster />
            <Outlet></Outlet>
        </div>
    );
};

export default Main;