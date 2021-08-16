import React from 'react'
import { ToastContainer } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

function Layout({ children }) {
    return (
        <React.Fragment>
            {children}
            <ToastContainer/>
        </React.Fragment>
    )
}

export default Layout;

