import React from "react";

const GardenContext = React.createContext({
  plots: [],
  handleSubmitNewGarden: () => {},
  handleClickCancel: () => {},
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
