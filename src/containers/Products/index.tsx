import React, { Component } from "react";
import { withAppContext } from "../../context/AppContextConsumer";
import ProductsNavbar from "../../components/Products/productsNavbar";

interface ProductProps {
  context: any;
}

interface ProductState {
  filterType: any;
  filter: any;
}

class Products extends Component<ProductProps, ProductState> {
  filterType: any = { filterType: "All" };

  constructor(props) {
    super(props);
    const { params } = props.match;
    if (params && params.filterType) {
      this.filterType = params;
    }
  }

  componentWillMount() {
    this.setState({ filterType: this.filterType });
  }

  componentWillReceiveProps(newProps) {
    const { params } = newProps.match;
    if (params && params.filterType) {
      this.filterType = params;
    }
    this.setState({ filterType: this.filterType });
  }

  render() {
    const { filterType } = this.state;
    return (
      <>
        <br />
        <ProductsNavbar filter={filterType} />
      </>
    );
  }
}

export default withAppContext(Products);
