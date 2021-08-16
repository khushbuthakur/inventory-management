import React, { useContext } from 'react'
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Layout from '../components/Layout/Layout';
import { AuthContext } from '../context/Auth';
import Login from '../pages/Login';
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
        <RouteWrapper path="/products" exact component={ProductList} />

        <Route exact path="/">
          <Redirect to="/" />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default Nav;
