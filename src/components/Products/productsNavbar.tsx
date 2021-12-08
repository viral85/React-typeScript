import React, { Component } from "react";
import Tab from "react-bootstrap/Tab";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Grid from "../Grid";
import {
  CategoryService,
  SavedProductService,
  HistoryProductService,
} from "../../services/services";
import { MODULES } from "../../utils/routesNames";
import { history } from "../../utils/appConfig";

interface ProductState {
  gridData: any;
  savedProductType: string;
  filterType: any;
  filterInfo: any;
}

interface ProductProps {
  filter: any;
}

class ProductsNavbar extends Component<ProductProps, ProductState> {
  categoryHistory: any = [];

  componentWillMount() {
    this.setState({ savedProductType: "2" });
  }

  componentDidMount() {
    const { filterType } = this.props.filter;
    this.setState({ filterInfo: this.props.filter }, () => {
      this._fetchProductList(filterType);
    });
  }

  componentWillReceiveProps(newProp) {
    const { filterType } = newProp.filter;
    this.setState({ filterInfo: newProp.filter }, () => {
      this._fetchProductList(filterType);
    });
  }

  _fetchProductList = (filterType: any) => {
    this.setState({ gridData: null, filterType: this.props.filter.filterType });
    switch (filterType) {
      case "All":
        this._fetchCategoryList();
        break;
      case "Saved":
        this._fetchSavedProductList();
        break;
      case "History":
        this._fetchHistoryProductList();
        break;
      default:
        this._fetchCategoryList();
    }
  };

  _fetchSubCategoryList = async (data) => {
    const { filterType, productId, productSubID } = this.state.filterInfo;
    console.log("data", data, productId);
    const filterArray = data.filter((item: any) => item.id == productId);
    console.log("data===", filterArray);
    if (productSubID) {
      console.log("data", filterArray);
    } else {
      this.setState({ gridData: filterArray[0].sub_categories });
    }
  };

  _fetchCategoryList = async () => {
    const { filterType } = this.props.filter;
    if (filterType !== "All") {
      history.push("/product/All");
    } else {
      const res = await CategoryService();
      if (res) {
        const info = this.state.filterInfo;
        if (info && info.productId) {
          this._fetchSubCategoryList(res.data);
        } else {
          this.setState({ gridData: res.data });
        }
      }
    }
  };

  _fetchSavedProductList = async () => {
    const { savedProductType } = this.state;
    const res = await SavedProductService(savedProductType);
    if (res) {
      const val = res.data.map((obj) => {
        obj["name"] = obj["product_name"];
        delete obj["product_name"];
        obj["id"] = obj["product_id"];
        delete obj["product_id"];
        return obj;
      });
      this.setState({ gridData: val });
    }
  };

  _fetchHistoryProductList = async () => {
    const res = await HistoryProductService();
    if (res) {
      this.setState({ gridData: null });
    }
  };

  _savedProductTypeOnChange = (event) => {
    this.setState({ savedProductType: event.target.value });
    this._fetchSavedProductList();
  };

  _viewDetails = (gridItem) => {
    const { gridData, filterType, filterInfo } = this.state;
    if (gridItem.has_category) {
      this.categoryHistory.push(gridData);
      if (filterInfo && filterInfo.productId) {
        this.setState({
          gridData: gridItem.sub_categories,
        });
      } else {
        history.push(`${MODULES.products.url}/${filterType}/${gridItem.id}`);
      }
    } else {
      history.push(MODULES.productDetails.url + "/" + gridData[0].id);
    }
  };

  _viewLastCategoryDetails = () => {
    if (this.categoryHistory && this.categoryHistory.length > 0) {
      const index = this.categoryHistory.length - 1;
      this.setState({
        gridData: this.categoryHistory[index],
      });
      this.categoryHistory.pop();
    }
  };

  render() {
    const { savedProductType, filterType } = this.state;

    return (
      <React.Fragment>
        <Tab.Container id="left-tabs-example" defaultActiveKey={filterType}>
          <Row>
            <Col sm={9}>
              {this.state && this.state.gridData && (
                <Tab.Content>
                  <Tab.Pane active={filterType === "All"}>
                    <h3> All Products</h3>
                    <Grid
                      gridData={this.state.gridData}
                      gridItemClick={this._viewDetails}
                      gridItemHistory={this.categoryHistory}
                      lastGridHistoryItemClick={this._viewLastCategoryDetails}
                    />
                  </Tab.Pane>
                  <Tab.Pane active={filterType === "Saved"}>
                    <h3> Saved Products</h3>
                    <br />
                    <select
                      className="form-control col-4"
                      value={savedProductType}
                      onChange={this._savedProductTypeOnChange}
                    >
                      <option value="1">Commonly</option>
                      <option value="2">Occasionally</option>
                    </select>
                    <br />
                    <Grid gridData={this.state.gridData} />
                  </Tab.Pane>
                  <Tab.Pane active={filterType === "History"}>
                    <h3> History Products</h3>
                    <Grid gridData={this.state.gridData} />
                  </Tab.Pane>
                </Tab.Content>
              )}
            </Col>
            <Col sm={3} className="border-left">
              <Nav variant="pills" className="flex-column">
                <Nav.Item>
                  <Nav.Link
                    onClick={() => this._fetchProductList("All")}
                    active={filterType === "All"}
                  >
                    All Products
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    onClick={() =>
                      history.push(MODULES.products.url + "/Saved")
                    }
                    active={filterType === "Saved"}
                  >
                    Saved Products
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    onClick={() =>
                      history.push(MODULES.products.url + "/History")
                    }
                    active={filterType === "History"}
                  >
                    History
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
          </Row>
        </Tab.Container>
      </React.Fragment>
    );
  }
}

export default ProductsNavbar;
