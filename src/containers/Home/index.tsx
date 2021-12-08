import React from "react";
import Carousel from "react-bootstrap/Carousel";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Home = (props: any) => {
  // const { context } = props;
  return (
    <>
      {/* {context.auth.name} welcome to Home Page */}
      <Row>
        <Col sm={12}>
          <Carousel className="container">
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://rethinkingcompetitions.com/wp-content/uploads/2016/09/400x800-image.jpg"
                alt="First slide"
              />
              <Carousel.Caption>
                <h3>First slide label</h3>
                <p>
                  Nulla vitae elit libero, a pharetra augue mollis interdum.
                </p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://upload.wikimedia.org/wikipedia/commons/7/71/Milna%2C_Bra%C4%8D%2C_Hrvatska_-_Blata%C5%A1ka_riva_800x400.jpg"
                alt="Third slide"
              />

              <Carousel.Caption>
                <h3>Second slide label</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://cdn.wallpapersafari.com/24/37/K4wNkq.jpg"
                alt="Third slide"
              />

              <Carousel.Caption>
                <h3>Third slide label</h3>
                <p>
                  Praesent commodo cursus magna, vel scelerisque nisl
                  consectetur.
                </p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </Col>
      </Row>
    </>
  );
};

export default Home;
