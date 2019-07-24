import React, { Component } from "react";
import GardenContext from "../../context/GardenContext";
import TokenService from "../../services/token-service";
import "./AddGarden.css";

class AddGarden extends Component {
  constructor(props) {
    super(props);
    this.state = {
      plotName: "",
      crops: [
        {
          cropName: "",
          datePlanted: "",
          dateHarvested: "",
          sqft: null,
          notes: ""
        }
      ],
      id: null,
      plotNotes: "",
      edit: false
    };
  }

  static contextType = GardenContext;

  //check that user is logged in, if user navigated to /new from edit button, prepopulate form with selected project's info
  componentDidMount() {
    if (!TokenService.hasAuthToken()) {
      this.context.redirectToLogin();
    } else if (this.props.params === undefined) {
      return;
    } else if (this.props.params.edit === "Y") {
      this.setState({
        plotName: this.props.params.plot.plotName,
        plotNotes: this.props.params.plot.plotNotes,
        id: this.props.params.plot.id,
        crops: this.props.params.plot.crops,
        edit: true
      });
    }
  }

  handleGardenNameChange = e => {
    this.setState({ plotName: e.target.value });
    this.setState({ id: Math.floor(Math.random() * 1000) });
  };

  handleAddCrop = e => {
    e.preventDefault();
    this.setState({
      crops: this.state.crops.concat({
        cropName: "",
        dateHarvested: "",
        datePlanted: "",
        sqft: null,
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

  handleSqftChange = (e, i) => {
    const crops = this.state.crops;
    crops[i].sqft = Number(e.target.value);
    this.setState({ crops });
  };

  handleCropNotesChange = (e, i) => {
    const crops = this.state.crops;
    crops[i].notes = e.target.value;
    this.setState({ crops });
  };

  handleRemoveCrop = i => () => {
    this.setState({
      crops: this.state.crops.filter((crop, cindex) => i !== cindex)
    });
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
    this.context.handleSubmitNewGarden(plot);
  };

  render() {
    return (
      <section className="main-section">
        {this.state.edit ? (
          <h2 className="heading dash-heading">Edit Plot</h2>
        ) : (
          <h2 className="heading dash-heading">Add a Garden Plot</h2>
        )}
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
                    required
                    aria-required="true"
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
                    required
                    aria-required="true"
                    aria-labelledby="datePlanted"
                    name="datePlaned"
                    id="datePlanted"
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
                    required
                    aria-required="true"
                    aria-labelledby="dateHarvested"
                    name="dateHarvested"
                    id="dateHarvested"
                    value={this.state.crops[i].dateHarvested}
                    onChange={e => {
                      this.handleHarvestDateChange(e, i);
                    }}
                  />
                </div>
                <div>
                  <label htmlFor="sqft">Square Feet Planted: </label>
                  <input
                    type="number"
                    id="sqft"
                    name="sqft"
                    required
                    aria-required="true"
                    aria-labelledby="sqft"
                    defaultValue={this.state.crops[i].sqft}
                    onChange={e => {
                      this.handleSqftChange(e, i);
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
                <div className="button-container">
                  <button type="button" onClick={this.handleRemoveCrop(i)}>
                    Remove
                  </button>
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
            <button type="button" onClick={this.handleAddCrop}>
              Add Crop
            </button>
            <button type="button" onClick={this.context.handleClickCancel}>
              Cancel
            </button>
            <button className="submit-button" type="submit">
              Submit
            </button>
          </div>
        </form>
      </section>
    );
  }
}

export default AddGarden;
