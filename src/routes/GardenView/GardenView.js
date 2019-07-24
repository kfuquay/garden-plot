import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import GardenContext from "../../context/GardenContext";
import Donut from "../../components/Donut/Donut";
import Gantt from "../../components/Gantt/Gantt";
import './GardenView.css'
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
        <div className="button-container">
          {/* <button className="button" onClick={this.context.handleClickCancel}>
            Back
          </button> */}

          <Link to={`/edit/${plot.id}`}>
            <button className="button">Edit</button>
          </Link>
          {/* <button
            className="button"
            onClick={() => this.context.deleteProject(plot.id)}
          >
            Delete Project
          </button> */}
        </div>
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
