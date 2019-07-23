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
    this.props.plot.crops.map(crop => {
      return data.push([
        `${crop.cropName}`,
        `${crop.cropName}`,
        new Date(`${crop.datePlanted}`),
        new Date(`${crop.dateHarvested}`),
        this.findMillis(crop.datePlanted, crop.dateHarvested),
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
            title: `${this.props.plot.plotName} timeline`
          }}
          width={"100%"}
          height={"800px"}
          loader={<div>Loading Chart</div>}
          data={[columns, ...rows]}
        />
      </div>
    );
  }
}

export default Gantt;
