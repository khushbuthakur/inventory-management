import React, {useContext} from 'react';
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import { useHistory, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/Auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faHome, faThermometer, faUser, faUserTie, faFileInvoiceDollar, faUserTag } from '@fortawesome/free-solid-svg-icons';
import displayToast from '../../utils/displayToast';
import {Button, Navbar, Container, } from 'react-bootstrap';

function Sidenav() {
    const history = useHistory();
    const location = useLocation();
    const {isLoggedIn, setUserData, userData } = useContext(AuthContext);

    const logoutUser = () => {
        displayToast("Logged out successfully!", "success");
    
        setTimeout(() => {
          setUserData(null);
          history.push("/");
        }, 1000);
      }

    if(!isLoggedIn){
        return null;
    }else{
     return (
        <React.Fragment>
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="/">!nventoria</Navbar.Brand>   
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        <FontAwesomeIcon icon={faUserTie} className="side-nav-icons"/>  {userData.fullName} - <b>{userData.designation}</b>
                    </Navbar.Text>
                </Navbar.Collapse>  

                <Navbar.Collapse className="justify-content-end">
                    <Button variant="outline-dark" className="" onClick={logoutUser}>Logout</Button>
                </Navbar.Collapse>   
            </Container>
            </Navbar>
            <SideNav
                className="side--nav"
                onSelect={(selected) => {
                    const to = '/' + selected;
                    if (location.pathname !== to) {
                        history.push(to);
                    }
                }}
            >
                <SideNav.Toggle />
                <SideNav.Nav defaultSelected="home">
                    {/* <NavItem eventKey="/home">
                        <NavIcon>
                        <FontAwesomeIcon icon={faHome} className="side-nav-icons"/>
                        </NavIcon>
                        <NavText>
                            Home
                        </NavText>
                    </NavItem> */}
                    <NavItem eventKey="manage-products">
                        <NavIcon>
                        <FontAwesomeIcon icon={faCoffee} className="side-nav-icons"/>
                            {/* <i className="fa fa-fw fa-device" style={{ fontSize: '1.75em' }} /> */}
                        </NavIcon>
                        <NavText>
                            Products
                        </NavText>
                    </NavItem>

                    {userData.designation.toUpperCase() === 'MANAGER' && (
                    <NavItem eventKey="manage-employees">
                        <NavIcon>
                        <FontAwesomeIcon icon={faUserTie} className="side-nav-icons"/>
                            {/* <i className="fa fa-fw fa-device" style={{ fontSize: '1.75em' }} /> */}
                        </NavIcon>
                        <NavText>
                            Employees
                        </NavText>
                    </NavItem>
                    )}

                    <NavItem eventKey="manage-buyers">
                        <NavIcon>
                        <FontAwesomeIcon icon={faUserTag} className="side-nav-icons"/>
                            {/* <i className="fa fa-fw fa-device" style={{ fontSize: '1.75em' }} /> */}
                        </NavIcon>
                        <NavText>
                            Buyers
                        </NavText>
                    </NavItem>

                    <NavItem eventKey="manage-purchase-order">
                        <NavIcon>
                        <FontAwesomeIcon icon={faFileInvoiceDollar} className="side-nav-icons"/>
                            {/* <i className="fa fa-fw fa-device" style={{ fontSize: '1.75em' }} /> */}
                        </NavIcon>
                        <NavText>
                            Purchase Orders
                        </NavText>
                    </NavItem>

                </SideNav.Nav>
            </SideNav>
            </React.Fragment>
            )
    }  
}

export default Sidenav;
