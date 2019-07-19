import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import GardenContext from "../../context/GardenContext";
import "./Dash.css";

class Dash extends Component {
  static contextType = GardenContext;

  render() {
    return (
      <Fragment>
        {this.context.plots ? (
          <section className="main-section">
            <h2 className="heading dash-heading">My Plots</h2>
            <ul className="dash-ul">
              {this.context.plots.map(plot => {
                return (
                  <li key={plot.id} className="dash-li">
                    <Link to={`/plot/${plot.id}`} className="li-link">
                      {plot.plotName}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        ) : (
          <p className="dash-p">You don't have any saved Plots!</p>
        )}
      </Fragment>
    );
  }
}

export default Dash;
