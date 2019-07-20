import React, { Component } from "react";
import GardenContext from "../../context/GardenContext";
import "./AddGarden.css";

class AddGarden extends Component {
  constructor(props) {
    super(props);
    this.state = {
      plotName: "",
      crops: [{ cropName: "", datePlanted: "", dateHarvested: "", notes: "" }],
      id: 777,
      plotNotes: ""
    };
  }

  static contextType = GardenContext;

  handleGardenNameChange = e => {
    this.setState({ plotName: e.target.value });
  };

  handleAddCrop = e => {
    e.preventDefault();
    this.setState({
      crops: this.state.crops.concat({
        cropName: "",
        dateHarvested: "",
        datePlanted: "",
        notes: ""
      })
    });
  };

  handleCropNameChange = (e, i) => {
    const crops = this.state.crops;
    crops[i].cropName = e.target.value;
    this.setState({ crops });
  };

  handlePlantDateChange = (e, i) => {
    const crops = this.state.crops;
    crops[i].datePlanted = e.target.value;
    this.setState({ crops });
  };

  handleHarvestDateChange = (e, i) => {
    const crops = this.state.crops;
    crops[i].dateHarvested = e.target.value;
    this.setState({ crops });
  };

  handleCropNotesChange = (e, i) => {
    const crops = this.state.crops;
    crops[i].notes = e.target.value;
    this.setState({ crops });
  };

  handlePlotNotesChange = e => {
    this.setState({ plotNotes: e.target.value });
  };

  handleAddGarden = e => {
    e.preventDefault();
    const plot = {
      plotName: this.state.plotName,
      crops: this.state.crops,
      plotNotes: this.state.plotNotes,
      id: this.state.id
    };
    console.log(plot);
    this.context.handleSubmitNewGarden(plot);
  };

  render() {
    return (
      <section className="main-section">
        <h2 className="heading dash-heading">Add a Garden Plot</h2>
        <form className="add-form" onSubmit={this.handleAddGarden}>
          <div className="gardenName-container">
            <label htmlFor="gardenName">Name: </label>
            <input
              type="text"
              name="gardenName"
              id="gardenName"
              value={this.state.plotName}
              onChange={this.handleGardenNameChange}
              placeholder="Garden Name..."
              aria-required="true"
              required
            />
          </div>
          <div className="crop-container">
            {this.state.crops.map((crop, i) => (
              <div className="crop-container crop-group" key={i}>
                <div>
                  <label htmlFor="cropName">Crop Name:</label>
                  <input
                    type="text"
                    name="crop"
                    aria-labelledby="crop"
                    value={this.state.crops[i].cropName}
                    onChange={e => {
                      this.handleCropNameChange(e, i);
                    }}
                  />{" "}
                </div>
                <div>
                  <label htmlFor="datePlanted">Planted On:</label>
                  <input
                    type="date"
                    value={this.state.crops[i].datePlanted}
                    onChange={e => {
                      this.handlePlantDateChange(e, i);
                    }}
                  />
                </div>
                <div>
                  <label htmlFor="dateHarvested">Harvest On:</label>
                  <input
                    type="date"
                    value={this.state.crops[i].dateHarvested}
                    onChange={e => {
                      this.handleHarvestDateChange(e, i);
                    }}
                  />
                </div>
                <div>
                  <label htmlFor="cropNotes">Notes:</label>
                  <textarea
                    rows="7"
                    cols="30"
                    maxLength="9999"
                    name="cropNotes"
                    value={this.state.crops[i].notes}
                    onChange={e => {
                      this.handleCropNotesChange(e, i);
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div>
            <label htmlFor="plotNotes">Plot Notes: </label>
            <textarea
              name="plotNotes"
              id="plotNotes"
              rows="7"
              cols="30"
              maxLength="9999"
              value={this.state.plotNotes}
              onChange={this.handlePlotNotesChange}
            />
          </div>

          <div className="button-container">
            <button type="button" onClick={this.handleAddCrop}>Add Crop</button>
            <button type="button" onClick={this.context.handleClickCancel}>Cancel</button>
            <button type="submit">Submit</button>
          </div>
        </form>
      </section>
    );
  }
}

export default AddGarden;
