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
            pieHole: 0.4,
            slices: [
              { color: "hotpink" },
              { color: "rgb(232, 165, 93)" },
              { color: "#BADA55" },
              { color: "#5887E8" },
              { color: "#61FF88" },
              { color: "#CC63FF" },
              { color: "#CC4C3B" },
              { color: "#FFE857" },
              { color: "#576480" },
              { color: "#4FE8A3" }
            ],
            titleTextStyle: {
              color: "#576480",
              fontName: "Open Sans",
              fontSize: 16,
              bold: true,
              italic: false
            },
            tooltip: { textStyle: { color: "#576480" }, showColorCode: true, ignoreBounds: true }
          }}
        />
      </div>
    );
  }
}

export default Donut;
