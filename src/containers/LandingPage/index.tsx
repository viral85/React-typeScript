import React, { Component } from "react";
import Button from 'react-bootstrap/Button';
import { history } from "../../utils/appConfig";
import { MODULES } from "../../utils/routesNames";

class LandingPage extends Component {

  loginClick = (e) => {
    e.preventDefault();
    history.push(MODULES['login'].url);
  }

  signUpClick = () => {
    history.push(MODULES.signUp.url);
  }

  render() {
    return (
      <React.Fragment>
        <Button onClick={this.loginClick} variant="primary">Login</Button>
        {' '}
        <Button onClick={this.signUpClick} variant="primary">Sign Up</Button>
        {/* ARZ Food Service Landing Page */}
      </React.Fragment>
    );
  }
}

export default LandingPage;