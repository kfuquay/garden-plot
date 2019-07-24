import React from "react";

const GardenContext = React.createContext({
  plots: [],
  handleSubmitNewGarden: () => {},
  handleClickCancel: () => {},
  setCurrentUser: () => {},
  setCurrentUserId: () => {},
  handleLoginSuccess: () => {},
  redirectToLogin: () => {},
});

export default GardenContext;
