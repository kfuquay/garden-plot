import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import GardenContext from "../../context/GardenContext";
import Donut from "../../components/Donut/Donut";
import Gantt from "../../components/Gantt/Gantt";
import "./GardenView.css";
class GardenView extends Component {
  static defaultProps = {
    match: { params: {} }
  };

  static contextType = GardenContext;
  //TODO: make days til havest function work lol

  render() {
    const plot = this.context.plots.find(
      plot => plot.plotid === Number(this.props.match.params.id)
    );
    return (
      <section className="main-section">
        <div className="button-container">
          {this.context.currentUser === plot.username ? (
            <Link to={`/edit/${plot.plotid}`}>
              <button className="button">Edit</button>
            </Link>
          ) : (
            <Fragment />
          )}
        </div>
        <h2 className="heading dash-heading">{plot.plotname}</h2>
        {plot.plotnotes !== null && plot.plotnotes !== undefined ? (
          <p className="lp-p">{plot.plotnotes}</p>
        ) : (
          <Fragment />
        )}
        <Donut plot={plot} />
        <Gantt plot={plot} />
        <div className="notes-container">
          <h2 className="heading dash-heading">Notes:</h2>
          {plot.crops.crops.map((crop, i) => (
            <div key={i}>
              {crop.cropnotes !== "" ? (
                <Fragment>
                  <p className="cropnotes lp-p">
                    <span className="cropname">{crop.cropname}:</span>{" "}
                  </p>
                  <p className="cropnotes lp-p">Notes: {crop.cropnotes}</p>
                  <p className="cropnotes lp-p mobile">
                    Start Date: {crop.dateplanted}
                  </p>
                  <p className="cropnotes lp-p mobile">
                    End Date: {crop.dateharvested}
                  </p>
                  <p className="cropnotes lp-p mobile">
                    Days until harvest:{" "}
                    {new Date(crop.dateharvested) - new Date()}
                  </p>
                </Fragment>
              ) : (
                <Fragment />
              )}
            </div>
          ))}
        </div>
      </section>
    );
  }
}

export default GardenView;
