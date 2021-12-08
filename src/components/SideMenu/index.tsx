import React, { useCallback } from "react";
import { history } from "../../utils/appConfig";
import { MODULES } from "../../utils/routesNames";
import Button from "react-bootstrap/Button";
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import "./styles.css";

const SideMenu = () => {
  const onClick = useCallback((path) => {
    history.push(path);
  }, []);

  return (
    <React.Fragment>
      <ButtonGroup vertical className="menu">
      <Button variant='dark' onClick={() => onClick(MODULES.home.url)}>
        Home
      </Button>
      <Button variant='dark' onClick={() => onClick(MODULES.cart.url)}>
        Cart
      </Button>
      <Button
        variant='dark'
        onClick={() => onClick(MODULES.orderHistory.url)}
      >
        Order History
      </Button>
      <Button
        variant='dark'
        onClick={() => onClick(MODULES.generalInquiry.url)}
      >
        General Inquiry
      </Button>
      <Button
        variant='dark'
        onClick={() => onClick(MODULES.accountSettings.url)}
      >
        Account Settings
      </Button>
      <Button
        variant='dark'
        onClick={() => onClick(MODULES.products.url + "/All")}
      >
        Products
      </Button>
      </ButtonGroup>
    </React.Fragment>
  );
};

export default SideMenu;
