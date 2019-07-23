import React, { Component } from "react";
import { Chart } from "react-google-charts";

class Donut extends Component {
  getData = () => {
    const data = [["Crop", "Square Feet Planted"]];
    this.props.plot.crops.map(crop => {
      return data.push([`${crop.cropName}`, Number(`${crop.sqft}`)]);
    });
    return data;
  };

  render() {
    const data = this.getData();
    return (
      <div className="chart-container">
        <Chart
          width={"750px"}
          height={"450px"}
          chartType="PieChart"
          loader={<div>Loading Chart</div>}
          data={data}
          options={{
            title: `${this.props.plot.plotName} Crop Percentage`,
            pieHole: 0.4
          }}
          rootProps={{ "data-testid": "1" }}
        />
      </div>
    );
  }
}

export default Donut;
