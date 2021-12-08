import React, { Component } from "react";
import "./styles.css";
import Button from "react-bootstrap/esm/Button";
import GridItem from "./gridItem";

interface GridProps {
  context?: any;
  gridData: any;
  gridItemClick?: Function;
  gridItemHistory?: any;
  lastGridHistoryItemClick?: Function;
}

interface GridState {
  gridData: any;
}

class Grid extends Component<GridProps, GridState> {

  render() {
    const { gridItemClick, gridItemHistory, gridData, lastGridHistoryItemClick } = this.props;

    return (
      <React.Fragment>
        {gridItemHistory && gridItemHistory.length ? (
          <Button
            variant='outline-dark'
            onClick={() => {lastGridHistoryItemClick && lastGridHistoryItemClick()}}
          >
            {" "}
            &lt;&lt; Back{" "}
          </Button>
        ) : (
          <></>
        )}
        <div className='container mt-5'>
          <div className='row'>
            {gridData ? (
              gridData.map((foodElement: any) => (
                <GridItem
                  itemDetails={foodElement}
                  gridItemClick={() => {
                    gridItemClick && gridItemClick(foodElement);
                  }}
                />
              ))
            ) : (
              <h3> No Data Found </h3>
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Grid;
