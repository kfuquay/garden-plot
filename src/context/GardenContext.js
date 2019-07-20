import React from "react";

const GardenContext = React.createContext({
  plots: [],
  handleSubmitNewGarden: () => {},
  handleClickCancel: () => {},
});

export default GardenContext;
