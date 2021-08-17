import React, {useContext} from 'react';
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import { useHistory, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/Auth';

function Sidenav() {
    const history = useHistory();
    const location = useLocation();
    const {isLoggedIn } = useContext(AuthContext);

    if(!isLoggedIn){
        return null;
    }else{
     return (
        <React.Fragment>
            <SideNav
                onSelect={(selected) => {
                    const to = '/' + selected;
                    if (location.pathname !== to) {
                        history.push(to);
                    }
                }}
            >
                <SideNav.Toggle />
                <SideNav.Nav defaultSelected="home">
                    <NavItem eventKey="/">
                        <NavIcon>
                            <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
                        </NavIcon>
                        <NavText>
                            Home
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="manage-products">
                        <NavIcon>
                            <i className="fa fa-fw fa-device" style={{ fontSize: '1.75em' }} />
                        </NavIcon>
                        <NavText>
                            Products
                        </NavText>
                    </NavItem>

                    <NavItem eventKey="manage-employees">
                        <NavIcon>
                            <i className="fa fa-fw fa-device" style={{ fontSize: '1.75em' }} />
                        </NavIcon>
                        <NavText>
                            Employees
                        </NavText>
                    </NavItem>

                    <NavItem eventKey="manage-buyers">
                        <NavIcon>
                            <i className="fa fa-fw fa-device" style={{ fontSize: '1.75em' }} />
                        </NavIcon>
                        <NavText>
                            Buyers
                        </NavText>
                    </NavItem>

                    <NavItem eventKey="manage-purchase-order">
                        <NavIcon>
                            <i className="fa fa-fw fa-device" style={{ fontSize: '1.75em' }} />
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
