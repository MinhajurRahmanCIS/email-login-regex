import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header/Header';
import { Toaster } from 'react-hot-toast';
const Main = () => {
    return (
        <div>
            <Header></Header>
            <Toaster />
            <Outlet></Outlet>
        </div>
    );
};

export default Main;