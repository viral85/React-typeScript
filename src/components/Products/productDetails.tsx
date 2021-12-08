import React, { Component, Fragment } from "react";
import Layout from "../Layout";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {
  GetProductDetailsService,
  AddToCartService,
} from "../../services/services";
import { ProductDetails } from "../../modals/Product";
import { AddToCart } from "../../modals/Cart";

interface ProductDetailState {
  productID: string;
  productDtls: ProductDetails | null;
  productQuantity: number;
}

class ProductsDetails extends Component<any, ProductDetailState> {
  productID: string = "";
  UNSAFE_componentWillMount() {
    const { params } = this.props.match;
    if (params && params.productID) {
      this.productID = params.productID;
      this._getProductDetails();
    }
  }

  componentDidMount() {
    this._getProductDetails();
  }

  componentWillReceiveProps(newProps) {
    const { params } = newProps.match;
    if (params && params.filterType) {
      this.productID = params.productID;
    }
  }

  _getProductDetails = async () => {
    const res = await GetProductDetailsService(this.productID);
    if (res && res.data) {
      let productDetails;
      productDetails = {
        ProductID: `${res.data.id}`,
        Name: `${res.data.name}`,
        Description: `${res.data.description}`,
        Price: `${res.data.price}`,
        Quantity: `${res.data.quantity}`,
        CategoryID: `${res.data.CategoryID}`,
      };
      this.setState({
        productDtls: productDetails,
        productID: this.productID,
        productQuantity: productDetails.Quantity,
      });
    }
  };

  _quantityChange = (qty: any) => {
    const { productQuantity } = this.state;
    const pQty = qty === "" ? 0 : isNaN(qty) ? productQuantity : qty;
    this.setState({ productQuantity: pQty });
  };

  _addToCart = async () => {
    const { productID, productQuantity } = this.state;
    const cartData = {
      ProductID: productID,
      Quantity: productQuantity,
    } as AddToCart;
    const res: any = await AddToCartService(cartData);
    if (res) {
      alert(res.message);
    }
  };

  render() {
    return (
      <>
        {this.state && this.state.productDtls ? (
          <Container>
            <Row>
              <Col md={6}>
                <a
                  href="https://frappe.qodeinteractive.com/wp-content/uploads/2018/04/product-img-5.jpg"
                  data-rel="prettyPhoto[woo_single_pretty_photo]"
                >
                  <img
                    width="500"
                    height="580"
                    src="https://frappe.qodeinteractive.com/wp-content/uploads/2018/04/product-img-5-600x680.jpg"
                    className="wp-post-image"
                    alt="m"
                    title="product-img-5"
                    data-caption=""
                    data-src="https://frappe.qodeinteractive.com/wp-content/uploads/2018/04/product-img-5.jpg"
                    data-large_image="https://frappe.qodeinteractive.com/wp-content/uploads/2018/04/product-img-5.jpg"
                    data-large_image_width="800"
                    data-large_image_height="907"
                    sizes="(max-width: 600px) 100vw, 600px"
                  />
                </a>
              </Col>
              <Col md={6}>
                <div>
                  <h1>{this.state.productDtls.Name}</h1>
                  <p className="h2">
                    <span>
                      <span>£</span>
                      {this.state.productDtls.Price}
                    </span>
                  </p>
                  <div className="woocommerce-product-rating">
                    <div
                      className="star-rating"
                      role="img"
                      aria-label="Rated 5.00 out of 5"
                    >
                      <span style={{ width: "100%" }}>
                        Rated <strong className="rating">5.00</strong> out of 5
                        based on <span className="rating">1</span> customer
                        rating
                      </span>
                    </div>{" "}
                    <a
                      href="#reviews"
                      className="woocommerce-review-link"
                      rel="nofollow"
                    >
                      (<span className="count">1</span> customer review)
                    </a>
                  </div>

                  <div className="woo-seperator-line"></div>

                  <div className="woo-short-description">
                    {this.state.productDtls.Description}
                    <p>
                      Proin gravida nibh vel velit auctor aliquet. Aenean
                      sollicitudin, lorem quis bibendum auctor, nisi elit
                      consequat ipsum, nec sagittis sem. Nibh id elit. Duis sed
                      odio sit amet nibh vulputate cursus a sit amet mauris.
                    </p>
                  </div>
                  <div className="cart form-inline">
                    <span>
                      <i className="ti-arrow-down"></i>
                    </span>
                    <label className="form-control">Quantity</label>
                    <input
                      type="number"
                      id="quantity"
                      className="form-control"
                      name="quantity"
                      value={this.state.productQuantity}
                      title="Qty"
                      placeholder=""
                      onChange={(e) => {
                        this._quantityChange(e.target.value);
                      }}
                    />
                    <span>
                      <i className="glyphicon glyphicon-upload"></i>
                    </span>
                    <button
                      type="button"
                      name="add-to-cart"
                      className="btn btn-danger"
                      onClick={this._addToCart}
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              </Col>
            </Row>
            <Row>
              <Col md={2}>
                <a
                  href="https://frappe.qodeinteractive.com/wp-content/uploads/2018/04/product-5-gallery-1.jpg"
                  data-rel="prettyPhoto[woo_single_pretty_photo]"
                >
                  <img
                    width="300"
                    height="300"
                    src="https://frappe.qodeinteractive.com/wp-content/uploads/2018/04/product-5-gallery-1-300x300.jpg"
                    alt="m"
                    title="product-5-gallery-1"
                    data-caption=""
                    data-src="https://frappe.qodeinteractive.com/wp-content/uploads/2018/04/product-5-gallery-1.jpg"
                    data-large_image="https://frappe.qodeinteractive.com/wp-content/uploads/2018/04/product-5-gallery-1.jpg"
                    data-large_image_width="600"
                    data-large_image_height="600"
                    sizes="(max-width: 300px) 100vw, 300px"
                    style={{ width: "100%", height: "80%" }}
                  />
                </a>
              </Col>
              <Col md={2}>
                <a
                  href="https://frappe.qodeinteractive.com/wp-content/uploads/2018/04/product-5-gallery-2.jpg"
                  data-rel="prettyPhoto[woo_single_pretty_photo]"
                >
                  <img
                    width="300"
                    height="300"
                    src="https://frappe.qodeinteractive.com/wp-content/uploads/2018/04/product-5-gallery-2-300x300.jpg"
                    alt="m"
                    title="product-5-gallery-2"
                    data-caption=""
                    data-src="https://frappe.qodeinteractive.com/wp-content/uploads/2018/04/product-5-gallery-2.jpg"
                    data-large_image="https://frappe.qodeinteractive.com/wp-content/uploads/2018/04/product-5-gallery-2.jpg"
                    data-large_image_width="600"
                    data-large_image_height="600"
                    sizes="(max-width: 300px) 100vw, 300px"
                    style={{ width: "100%", height: "80%" }}
                  />
                </a>
              </Col>
              <Col md={2}>
                <a
                  href="https://frappe.qodeinteractive.com/wp-content/uploads/2018/04/product-5-gallery-3.jpg"
                  data-rel="prettyPhoto[woo_single_pretty_photo]"
                >
                  <img
                    width="300"
                    height="300"
                    src="https://frappe.qodeinteractive.com/wp-content/uploads/2018/04/product-5-gallery-3-300x300.jpg"
                    alt="m"
                    title="product-5-gallery-3"
                    data-caption=""
                    data-src="https://frappe.qodeinteractive.com/wp-content/uploads/2018/04/product-5-gallery-3.jpg"
                    data-large_image="https://frappe.qodeinteractive.com/wp-content/uploads/2018/04/product-5-gallery-3.jpg"
                    data-large_image_width="600"
                    data-large_image_height="600"
                    sizes="(max-width: 300px) 100vw, 300px"
                    style={{ width: "100%", height: "80%" }}
                  />
                </a>
              </Col>
            </Row>
          </Container>
        ) : (
          <Fragment>No Details Found</Fragment>
        )}
      </>
    );
  }
}

export default ProductsDetails;
