import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import GardenContext from "../../context/GardenContext";
import PlotsApiService from "../../services/plots-api-service";
import "./Dash.css";

class Dash extends Component {
  static contextType = GardenContext;

  constructor(props) {
    super(props);
    this.state = {
      isChecked: false,
      results: [],
      isLoading: false
    };
  }

  componentDidMount() {
    // this.context.clearError();
    this.setState({ isLoading: true });
    PlotsApiService.getPlots()
      .then(this.context.setPlots)
      .then(this.setState({ isLoading: false }));
    // .catch(this.context.setError);
  }

  render() {
    return (
      <Fragment>
        {this.context.plots ? (
          <section className="main-section">
            <h2 className="heading dash-heading">My Plots</h2>
            <ul className="dash-ul">
              {this.context.plots.map(plot => {
                return (
                  <li key={plot.plotid} className="dash-li">
                    <Link to={`/plot/${plot.plotid}`} className="li-link">
                      {plot.plotname}
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
