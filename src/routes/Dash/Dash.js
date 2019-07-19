import React, { Component, Fragment } from "react";
import GardenContext from "../../context/GardenContext";

class Dash extends Component {
  static contextType = GardenContext;

  render() {
    console.log(this.context.plots);
    return (
      <Fragment>
        <p>hi</p>
        {this.context.plots ? (
          <ul>
            {this.context.plots.map(plot => {
              return <li>{plot.plotName}</li>;
            })}
          </ul>
        ) : (
          <p>You don't have any saved Plots!</p>
        )}
      </Fragment>
    );
  }
}

export default Dash;
