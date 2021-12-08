import React, { Fragment, Component } from "react";
import { LoginDetails } from "../../modals/Login";
import "./styles.css";
import LoginForm from "../../components/LoginForm";
import { LoginService } from "../../services/services";
import { setLocalStorage } from "../../utils/common";
import { withAppContext } from "../../context/AppContextConsumer";

interface loginProps {
  context: any;
}

class Login extends Component<loginProps> {
  login = async (loginData: LoginDetails) => {
    const { context } = this.props;
    
    const res = await LoginService(loginData);
      if(res) {
         setLocalStorage('token', res.data.token);
         const userDtls = {
          userID: res.data.user.id,
          name: res.data.user.name,
          userName: res.data.user.user_name,
          tradingName: res.data.user.trading_name
        }
        setLocalStorage('user', userDtls);
        context.setAuth(userDtls);
      }
  };

  render() {
    return (
      <Fragment>
        <div className='auth-wrapper'>
          <div className='auth-inner'>
              <LoginForm login={this.login} />
          </div>
        </div>
      </Fragment>
    );
  }
}

export default withAppContext(Login);
