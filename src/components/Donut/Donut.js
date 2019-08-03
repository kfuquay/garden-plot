import React, { Component } from "react";
import { Chart } from "react-google-charts";

class Donut extends Component {
  getData = () => {
    const data = [["Crop", "Square Feet Planted"]];
    this.props.plot.crops.crops.map(crop => {
      return data.push([`${crop.cropname}`, Number(`${crop.sqft}`)]);
    });
    return data;
  };

  render() {
    const data = this.getData();
    return (
        <div className="chart-container">
          <Chart
            width={"750px"}
            height={"500px"}
            chartType="PieChart"
            loader={<div>Loading Chart</div>}
            data={data}
            options={{
              height: "auto",
              width: "auto",
              title: `Crop Percentage`,
              pieHole: 0.4,
              slices: [
                { color: "#FF69B4" },
                { color: "#E8A55D" },
                { color: "#5887E8" },
                { color: "#61FF88" },
                { color: "#CC63FF" },
                { color: "#CC4C3B" },
                { color: "#576480" }
              ],
              titleTextStyle: {
                color: "#576480",
                fontName: "Open Sans",
                fontSize: 16,
                bold: true,
                italic: false
              },
              tooltip: {
                textStyle: { color: "#576480" },
                showColorCode: true,
                ignoreBounds: true
              }
            }}
          />
        </div>
    );
  }
}

export default Donut;
