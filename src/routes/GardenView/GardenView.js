import React, { Component, Fragment } from "react";
import GardenContext from "../../context/GardenContext";
// import BarChart from "../../components/BarChart/BarChart";

class GardenView extends Component {
  static defaultProps = {
    match: { params: {} }
  };

  static contextType = GardenContext;

  render() {
    const plot = this.context.plots.find(
      plot => plot.id === Number(this.props.match.params.id)
    );
    return (
      <section className="main-section">
        <h2 className="heading dash-heading">{plot.plotName}</h2>
        {/* <BarChart props={plot} /> */}
        {plot.plotNotes !== null && plot.plotNotes !== undefined ? (
          <p className="lp-p">{plot.plotNotes}</p>
        ) : (
          <Fragment />
        )}
      </section>
    );
  }
}

export default GardenView;
