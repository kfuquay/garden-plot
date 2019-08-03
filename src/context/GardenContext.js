import React from "react";

const GardenContext = React.createContext({
  plots: [],
  handleSubmitNewGarden: () => {},
  editPlot: () => {},
  handleClickCancel: () => {},
  deletePlot: () => {},
  setPlots: () => {},
  setCurrentUser: () => {},
  setCurrentUserId: () => {},
  handleLoginSuccess: () => {},
  redirectToLogin: () => {},
  currentUserId: "",
  currentUser: "",
  currentPlotId: '',
});

export default GardenContext;
