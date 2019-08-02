import config from "../config";
import TokenService from "./token-service";

const PlotsApiService = {
  getPlots() {
    return fetch(`${config.API_ENDPOINT}/plots`, {
      headers: {}
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  },
  getPlot(plotId) {
    return fetch(`${config.API_ENDPOINT}/plots/${plotId}`, {
      headers: {}
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  },
  postPlot(plot) {
    return fetch(`${config.API_ENDPOINT}/plots`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify(plot)
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  },
  editPlot(plot) {
    return fetch(`${config.API_ENDPOINT}/plots/${plot.plotid}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(plot)
    }).then(res => (!res.ok ? e => Promise.reject(e) : {}));
  },
  deletePlot(plotId) {
    return fetch(`${config.API_ENDPOINT}/plots/${plotId}`, {
      method: "DELETE"
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(error => {
            throw error;
          });
        }
      })
      .catch(error => {
        console.error(error);
      });
  }
};

export default PlotsApiService;
