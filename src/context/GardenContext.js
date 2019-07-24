import React from "react";

const GardenContext = React.createContext({
  plots: [],
  handleSubmitNewGarden: () => {},
  handleClickCancel: () => {},
  setCurrentUser: () => {},
  setCurrentUserId: () => {},
  handleLoginSuccess: () => {},
});

export default GardenContext;
