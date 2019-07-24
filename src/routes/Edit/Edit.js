import React, { Component, Fragment } from "react";
import GardenContext from "../../context/GardenContext";
import AddGarden from "../AddGarden/AddGarden";

class Edit extends Component {
  static contextType = GardenContext;

  render() {
    // get selected project
    const plot = this.context.plots.find(
      plot => plot.id === Number(this.props.match.params.id)
    );
    return (
      <Fragment>
        {/* send props edit: and project: so that ProjectForm  component can prepopulate the form with the project info */}
        <AddGarden params={{ edit: "Y", plot: { ...plot } }} />
      </Fragment>
    );
  }
}

export default Edit;
