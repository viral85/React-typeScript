import React from "react";
import { Route, RouteProps, Redirect, Switch } from "react-router-dom";
import PropTypes from "prop-types";
import Layout from "../components/Layout";
import { withAppContext } from "./../context/AppContextConsumer";

interface MyRouteProps extends RouteProps {
  component: any;
  projectData?: any;
  rest?: any;
  context?: any;
}

const PrivateRoute: React.SFC<MyRouteProps> = ({
  component: Component,
  context,
  ...rest
}) => (
  <Switch>
    <Layout>
      <Route
        {...rest}
        render={(props) =>
          // localStorage.getItem("token") ? ( // TODO: Valid Token, not expired or check user details
          <Component {...props} context={context} />
          // ) : (
          //   <Redirect to="/" />
          // )
        }
      />
    </Layout>
  </Switch>
);

PrivateRoute.propTypes = {
  component: PropTypes.any,
};

export default withAppContext(PrivateRoute);
