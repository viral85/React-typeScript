import React, { Component } from "react";
import logo from "./assets/images/logo.svg";
import "./App.css";
import AppProvider from "./context/AppContextProvider";
import Routes from "./routes";
import "./assets/css/common.css";
import { UserDetails } from "./modals/User";

interface States {
  auth: UserDetails|null;
}

class App extends Component<{}, States> {
  constructor(props) {
    super(props);
    this.state = {
     auth: null,
    };
  }

  setAuth = (val: any) => {
    this.setState({auth: val});
  }

  componentWillMount() {
    const token = localStorage.getItem('token');
    if (token) {
      const userDetails = localStorage.getItem('user');
      if (userDetails) {
        this.setAuth(JSON.parse(userDetails));
      }
    }
  }

  render() {
    const { auth } = this.state;
     return (
       <div className='App'>
      <title className='App-title'>
        <img src={logo} className='App-logo' alt='logo' />
      </title>
      <AppProvider 
       auth = { auth } setAuth = { this.setAuth } >
        <Routes />
      </AppProvider>
    </div>
     );
  }
}

export default App;
