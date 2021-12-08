import React, { Component, Fragment } from "react";
import SignUpForm from "../../components/SignUpForm";
import "./styles.css";
import { SignUpDetails } from "../../modals/SignUp";
import { history } from "../../utils/appConfig";
import { MODULES } from "../../utils/routesNames";
import { SignUpService } from "../../services/services";
import { unMaskMobileNumber } from "../../utils/common";

class SignUp extends Component {

  _signUp = async (signUpData: SignUpDetails) => {
    signUpData.MobileNumber = unMaskMobileNumber(signUpData.MobileNumber);
    const res: any = await SignUpService(signUpData);
    if(res){
      alert(res.message);
      history.push(MODULES.login.url);
    }
  };

  render() {
    return (
      <Fragment>
        <div className='auth-wrapper'>
          <div className='auth-inner'>
            <SignUpForm signUp={this._signUp} />
          </div>
        </div>
      </Fragment>
    );
  }
}

export default SignUp;
