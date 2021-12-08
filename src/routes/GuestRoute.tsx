import React from 'react';
import { Route, RouteProps, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { MODULES } from '../utils/routesNames';

interface MyRouteProps extends RouteProps {
  component: any;
  path:any;
  exact?:any;
  rest?: any;
}
const GuestRoute: React.SFC<MyRouteProps> = ({
  component: Component,
  ...rest
}) => (
  <>
        <Route
          {...rest}
          render={(props: any) => {
            if (localStorage.getItem('token')) {  // TODO: Valid Token, not expired or check user details
                return <Redirect to={MODULES.home.url} />;
            }
            return <Component {...props}  />;
          }}
        />
  </>
);

GuestRoute.propTypes = {
  component: PropTypes.any,
};
export default GuestRoute;
