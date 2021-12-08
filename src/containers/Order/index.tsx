import React, { Component } from "react";
import { withAppContext } from "../../context/AppContextConsumer";
import Grid from "../../components/Grid";
import Layout from "../../components/Layout";

class OrderHistory extends Component {
  render() {
    return (
      <h4>
        Order History Page
        <br />
        {/* <Grid /> */}
      </h4>
    );
  }
}

export default withAppContext(OrderHistory);
