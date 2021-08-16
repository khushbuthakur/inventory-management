import React, { useContext } from 'react'
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Layout from '../components/Layout/Layout';
import { AuthContext } from '../context/Auth';
import AddProduct from '../pages/AddProduct';
import Login from '../pages/Login';
import ManageBuyer from '../pages/Buyer/ManageBuyer';
import AddBuyer from '../pages/Buyer/AddBuyer';
import ProductList from '../pages/ProductList';
import Profile from '../pages/Profile';
import ManageEmployee from '../pages/Employee/ManageEmployee';
import AddEmployee from '../pages/Employee/AddEmployee';

function RouteWrapper({
  component: Component,
  TransparentNav,
  ...rest
}) {
  return (
    <Route
      {...rest}
      render={(props) => <Layout {...props} TransparentNav={TransparentNav}>
        <Component {...props} />
      </Layout>} />
  );
}

// function LoggedInRoutes() {
//     return (
//       <React.Fragment>
//         <RouteWrapper path="/" component={Home}/> 
//         <RouteWrapper path="/profile/" component={Profile}/>
//       </React.Fragment>
//     )
// }

// function NotLoggedInRoutes() {
//     return (
//       <React.Fragment>
//         <RouteWrapper path="/" component={Home}/> 
//       </React.Fragment>
//     )
// 

function Nav() {

  const { isLoggedIn } = useContext(AuthContext);

  return (
    <BrowserRouter baseName="/">
      <Switch>
        {isLoggedIn && <RouteWrapper path="/profile/" component={Profile} />}
        <RouteWrapper path="/" exact component={Login} />
        <RouteWrapper path="/manage-products" exact component={ProductList} />
        <RouteWrapper path="/add-product" exact component={AddProduct} />
        <RouteWrapper path="/edit-product" exact component={AddProduct} />
        <RouteWrapper path="/manage-buyers" exact component={ManageBuyer} />
        <RouteWrapper path="/add-buyer" exact component={AddBuyer} />
        <RouteWrapper path="/edit-buyer/" exact component={AddBuyer} />

        <RouteWrapper path="/manage-employees" exact component={ManageEmployee} />
        <RouteWrapper path="/add-employee" exact component={AddEmployee} />
        <RouteWrapper path="/edit-employee/" exact component={AddEmployee} />
        <Route exact path="/">
          <Redirect to="/" />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default Nav;
