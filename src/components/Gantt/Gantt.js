import React, { Component } from "react";
import { Chart } from "react-google-charts";

class Gantt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        { type: "string", label: "Task ID" },
        { type: "string", label: "Task Name" },
        { type: "string", label: "Resource" },
        { type: "date", label: "Start Date" },
        { type: "date", label: "End Date" },
        { type: "number", label: "Duration" },
        { type: "number", label: "Percent Complete" },
        { type: "string", label: "Dependencies" }
      ]
    };
  }

  findMillis = (startDate, endDate) => {
    const dif = endDate - startDate;

    return Math.abs(dif);
  };

  getRows = () => {
    const data = [];
    this.props.plot.crops.crops.map(crop => {
      return data.push([
        `${crop.cropname}`,
        `${crop.cropname}`,
        `${crop.cropname}`,
        new Date(`${crop.dateplanted}`),
        new Date(`${crop.dateharvested}`),
        this.findMillis(crop.dateplanted, crop.dateharvested),
        100,
        null
      ]);
    });
    return data;
  };

  render() {
    const columns = this.state.columns;
    const rows = this.getRows();
    return (
      <div className="chart-container">
        <Chart
          chartType="Gantt"
          options={{
            gantt: {
              criticalPathEnabled: false,
              percentEnabled: false,
              tooltip: {
                textStyle: { color: "#576480" },
                showColorCode: true,
                ignoreBounds: true
              },
              innerGridTrack: { fill: "#D9D9D9" },
              innerGridDarkTrack: { fill: "#E6E6E6" },
              palette: [
                {
                  color: "#FF69B4",
                  dark: "#CC5490",
                  light: "#FFB5DA"
                },
                {
                  color: "#E8A55D",
                  dark: "#B58148",
                  light: "##FF9019"
                },
                {
                  color: "#5887E8",
                  dark: "#456AB5",
                  light: "#A0BAEC"
                },
                {
                  color: "#CC4C3B",
                  dark: "#99392C",
                  light: "#D5887D"
                },
                {
                  color: "#576480",
                  dark: "#343C4D",
                  light: "#8B9FCC"
                }
              ]
            }
          }}
          width={"100%"}
          height={"600px"}
          loader={<div>Loading Chart</div>}
          data={[columns, ...rows]}
        />
      </div>
    );
  }
}

export default Gantt;
