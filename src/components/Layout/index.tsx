import React, { Component } from "react";
import SideMenu from "../SideMenu";
import BottomMenuBar from "../BottomMenuBar";
import Header from "../Header";

class Layout extends Component {

  render() {
    return (
      <React.Fragment>
        <Header />
        <div className='float-left'>
        <SideMenu />
        </div>
        <div>
        {this.props.children}
        </div>
        <div className="fixed-bottom">
        <BottomMenuBar />
        </div>
      </React.Fragment>
    );
  }
}

export default Layout;
