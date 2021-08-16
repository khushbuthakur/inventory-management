import React, { useContext } from 'react'
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Layout from '../components/Layout/Layout';
import { AuthContext } from '../context/Auth';
import AddBuyer from '../pages/AddBuyer';
import AddProduct from '../pages/AddProduct';
import Login from '../pages/Login';
import ManageBuyer from '../pages/ManageBuyer';
import ProductList from '../pages/ProductList';
import Profile from '../pages/Profile';

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
        <Route exact path="/">
          <Redirect to="/" />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default Nav;
