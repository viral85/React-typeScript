import React from "react";
import { Switch } from "react-router-dom";
import { MODULES } from "../utils/routesNames";
import LandingPage from "../containers/LandingPage";
import Login from "../containers/Login";
import { Router } from "react-router";
import { history } from "../utils/appConfig";
import SignUp from "../containers/SignUp";
import GuestRoute from "./GuestRoute";
import PrivateRoute from "./PrivateRoute";
import GeneralInquiry from "../containers/GeneralInquiry";
import AccountSettings from "../containers/AccountSettings";
import Products from "../containers/Products";
import ProductsDetails from "../components/Products/productDetails";
import OrderHistory from "../containers/Order";
import OrderDetails from "../components/Order/orderDetails";
import Cart from "../containers/Cart";
import Home from "../containers/Home";

const Routes = () => {
  return (
    <div>
      <Router history={history}>
        <Switch>
          <GuestRoute
            exact
            path={MODULES.landingPage.url}
            component={LandingPage}
          />
          <GuestRoute exact path={MODULES.login.url} component={Login} />
          <GuestRoute exact path={MODULES.signUp.url} component={SignUp} />
          <PrivateRoute exact path={MODULES.home.url} component={Home} />
          <PrivateRoute
            exact
            path={MODULES.generalInquiry.url}
            component={GeneralInquiry}
          />
          <PrivateRoute
            exact
            path={MODULES.accountSettings.url}
            component={AccountSettings}
          />
          <PrivateRoute
            exact
            path={`${MODULES.products.url}/:filterType`}
            component={Products}
          />
          <PrivateRoute
            exact
            path={`${MODULES.products.url}/:filterType/:productId`}
            component={Products}
          />
          <PrivateRoute
            exact
            path={`${MODULES.productDetails.url}/:productID`}
            component={ProductsDetails}
          />
          <PrivateRoute
            exact
            path={MODULES.orderHistory.url}
            component={OrderHistory}
          />
          <PrivateRoute
            exact
            path={`${MODULES.orderDetails.url}/:orderID`}
            component={OrderDetails}
          />
          <PrivateRoute exact path={MODULES.cart.url} component={Cart} />
          <LandingPage />
        </Switch>
      </Router>
    </div>
  );
};

export default Routes;
