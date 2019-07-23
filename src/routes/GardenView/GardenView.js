import React, { Component, Fragment } from "react";
import GardenContext from "../../context/GardenContext";
import Donut from "../../components/Donut/Donut";
import Gantt from "../../components/Gantt/Gantt";
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
        {plot.plotNotes !== null && plot.plotNotes !== undefined ? (
          <p className="lp-p">{plot.plotNotes}</p>
        ) : (
          <Fragment />
        )}
        <Donut plot={plot} />
        <Gantt plot={plot} />
      </section>
    );
  }
}

export default GardenView;
