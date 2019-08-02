import React, { Fragment, Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import GardenContext from "./context/GardenContext";
import LandingPage from "./routes/LandingPage/LandingPage";
import Nav from "./components/Nav/Nav";
import Dash from "./routes/Dash/Dash";
import Login from "./routes/Login/Login";
import GardenView from "./routes/GardenView/GardenView";
import AddGarden from "./routes/AddGarden/AddGarden";
import Edit from "./routes/Edit/Edit";
import PageNotFound from "./components/PageNotFound/PageNotFound";
import "./App.css";
import PlotsApiService from "./services/plots-api-service";

class App extends Component {
  static defaultProps = {
    store: {
      plots: []
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      currentUser: "",
      currentUserId: "",
      plots: [],
      currentPlotId: ""
    };
  }

  handleClickCancel = () => {
    this.props.history.push("/dash");
  };

  setPlots = plots => {
    this.setState({ plots });
  };

  handleSubmitNewGarden = plot => {
    PlotsApiService.postPlot(plot).then(() => {
      this.handleClickCancel();
    });
  };

  handleLoginSuccess = () => {
    const { location, history } = this.props;
    const destination = (location.state || {}).from || "/dash";
    history.push(destination);
  };

  redirectToLogin = () => {
    this.props.history.push("/login");
  };

  setCurrentUser = username => {
    this.setState({ currentUser: username });
  };

  setCurrentUserId = userId => {
    this.setState({ currentUserId: userId });
  };

  render() {
    const contextValue = {
      plots: this.state.plots,
      handleSubmitNewGarden: this.handleSubmitNewGarden,
      setPlots: this.setPlots,
      handleClickCancel: this.handleClickCancel,
      currentUser: this.state.currentUser,
      currentUserId: this.state.currentUserId,
      currentPlotId: this.state.currentPlotId,
      setCurrentUser: this.setCurrentUser,
      setCurrentUserId: this.setCurrentUserId,
      handleLoginSuccess: this.handleLoginSuccess,
      redirectToLogin: this.redirectToLogin
    };
    return (
      <Fragment>
        <header>
          <Nav />
        </header>
        <main className="App">
          <GardenContext.Provider value={contextValue}>
            <Switch>
              <Route exact path="/" component={LandingPage} />
              <Route path="/login" component={Login} />
              <Route path="/dash" component={Dash} />
              <Route path={"/plot/:id"} component={GardenView} />
              <Route path="/add" component={AddGarden} />
              <Route path={"/edit/:id"} component={Edit} />
              <Route component={PageNotFound} />
            </Switch>
          </GardenContext.Provider>
        </main>
      </Fragment>
    );
  }
}

export default withRouter(App);
