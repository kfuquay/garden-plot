import React, { Component } from "react";
import GardenContext from "../../context/GardenContext";
import TokenService from "../../services/token-service";
import "./AddGarden.css";

class AddGarden extends Component {
  constructor(props) {
    super(props);
    this.state = {
      plotid: "",
      plotname: "",
      crops: {
        crops: [
          {
            cropname: "",
            dateplanted: "",
            dateharvested: "",
            sqft: null,
            cropnotes: ""
          }
        ]
      },
      cropArray: [
        {
          cropname: "",
          dateplanted: "",
          dateharvested: "",
          sqft: null,
          cropnotes: ""
        }
      ],
      plotnotes: "",
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
        plotname: this.props.params.plot.plotname,
        plotnotes: this.props.params.plot.plotnotes,
        plotid: this.props.params.plot.plotid,
        cropArray: this.props.params.plot.crops.crops,
        edit: true
      });
    }
  }

  handleGardenNameChange = e => {
    this.setState({ plotname: e.target.value });
  };

  handleAddCrop = e => {
    e.preventDefault();

    this.setState({
      cropArray: this.state.cropArray.concat({
        cropname: "",
        cropnotes: "",
        dateplanted: "",
        dateharvested: "",
        sqft: ""
      })
    });
  };

  handleCropNameChange = (e, i) => {
    const cropArray = this.state.cropArray;
    cropArray[i].cropname = e.target.value;
    this.setState({ cropArray });
  };

  handlePlantDateChange = (e, i) => {
    const cropArray = this.state.cropArray;
    cropArray[i].dateplanted = e.target.value;
    this.setState({ cropArray });
  };

  handleHarvestDateChange = (e, i) => {
    const cropArray = this.state.cropArray;
    cropArray[i].dateharvested = e.target.value;
    this.setState({ cropArray });
  };

  handleSqftChange = (e, i) => {
    const cropArray = this.state.cropArray;
    cropArray[i].sqft = Number(e.target.value);
    this.setState({ cropArray });
  };

  handleCropNotesChange = (e, i) => {
    const cropArray = this.state.cropArray;
    cropArray[i].cropnotes = e.target.value;
    this.setState({ cropArray });
  };

  handleRemoveCrop = i => () => {
    this.setState({
      cropArray: this.state.cropArray.filter((crop, cindex) => i !== cindex)
    });
  };

  handlePlotNotesChange = e => {
    this.setState({ plotnotes: e.target.value });
  };

  handleAddGarden = e => {
    e.preventDefault();
    const plot = {
      plotname: this.state.plotname,
      plotnotes: this.state.plotnotes,
      crops: { crops: this.state.cropArray },
      user_id: this.context.currentUserId,
      plotid: this.state.plotid,
    };
    if (this.props.params === undefined) {
      this.context.handleSubmitNewGarden(plot);
    } else if (this.props.params.edit === "Y") {
      this.context.editPlot(plot);
    }
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
              value={this.state.plotname}
              onChange={this.handleGardenNameChange}
              placeholder="Garden Name..."
              aria-required="true"
              required
            />
          </div>
          <div className="crop-container">
            {this.state.cropArray.map((crop, i) => (
              <div className="crop-container crop-group" key={i}>
                <div>
                  <label htmlFor="cropName">Crop Name:</label>
                  <input
                    type="text"
                    name="cropName"
                    required
                    aria-required="true"
                    aria-labelledby="cropName"
                    value={this.state.cropArray[i].cropname}
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
                    value={this.state.cropArray[i].dateplanted}
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
                    value={this.state.cropArray[i].dateharvested}
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
                    defaultValue={this.state.cropArray[i].sqft}
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
                    value={this.state.cropArray[i].cropnotes}
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
              value={this.state.plotnotes}
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
