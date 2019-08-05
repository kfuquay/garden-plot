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

  getDaysDiff = dateharvested => {
    const dt2 = new Date(dateharvested);
    const dt1 = new Date();
    return Math.floor(
      (Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) -
        Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) /
        (1000 * 60 * 60 * 24)
    );
  };

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
        <h2 className="dash-heading plotname ">{plot.plotname}</h2>
        {plot.plotnotes !== null && plot.plotnotes !== undefined ? (
          <p className="lp-p">{plot.plotnotes}</p>
        ) : (
          <Fragment />
        )}
        <Donut plot={plot} />
        <Gantt plot={plot} />
        <div className="notes-container">
          <h3 className="heading dash-heading">Crops:</h3>
          {plot.crops.crops.map((crop, i) => (
            <div key={i}>
              {crop.cropnotes !== "" ? (
                <Fragment>
                  <p className="cropname">{crop.cropname}:</p>
                  <p className="cropnotes lp-p">
                    <span className="bold">Notes: </span>
                    {crop.cropnotes}
                  </p>
                  <p className="cropnotes lp-p mobile">
                    <span className="bold">Start Date: </span>
                    {crop.dateplanted}
                  </p>
                  <p className="cropnotes lp-p mobile">
                    <span className="bold">End Date: </span>
                    {crop.dateharvested}
                  </p>
                  <p className="cropnotes lp-p mobile">
                    <span className="bold">Days remaining: </span>
                    {this.getDaysDiff(crop.dateharvested)}
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
