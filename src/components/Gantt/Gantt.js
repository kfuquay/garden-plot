import React, { Component } from "react";
import { Chart } from "react-google-charts";

class Gantt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        { type: "string", label: "Task ID" },
        { type: "string", label: "Task Name" },
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
              }
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
