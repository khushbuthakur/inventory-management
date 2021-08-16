import React from 'react'
import { ToastContainer } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import '../../styles/index.scss';
import Sidenav from '../Navbar/Sidenav';

function Layout({ children }) {
    return (
        <React.Fragment>
            <Sidenav />
            <main className="main-section">
                {children}
            </main>
            <ToastContainer/>
        </React.Fragment>
    )
}

export default Layout;

