import React, { Fragment, Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import GardenContext from "./context/GardenContext";
import LandingPage from "./routes/LandingPage/LandingPage";
import Nav from "./components/Nav/Nav";
import Dash from "./routes/Dash/Dash";
import Login from "./routes/Login/Login";
import GardenView from "./routes/GardenView/GardenView";
import AddGarden from "./routes/AddGarden/AddGarden";
import PageNotFound from "./components/PageNotFound/PageNotFound";
import "./App.css";

class App extends Component {
  static defaultProps = {
    store: {
      plots: []
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      plots: [
        {
          id: 1,
          plotName: "Veggie Patch",
          crops: [
            {
              cropName: "carrots",
              datePlanted: "04-01-2019",
              dateHarvested: "06-01-2019",
              notes: "yummy!"
            },
            {
              cropName: "red russian kale",
              datePlanted: "06-15-2019",
              dateHarvested: "08-01-2019",
              notes: "wow, late summer kale?lol"
            }
          ],
          plotNotes:
            "veggie patch located at NE side of front field, partial shade, great soil, low lying area"
        },
        {
          id: 2,
          plotName: "Flower Bed",
          crops: [
            {
              cropName: "snapdragons",
              datePlanted: "03-01-2019",
              dateHarvested: null,
              notes:
                "harvest flowers throughout summer, begin producing early summer"
            },
            {
              cropName: "purple thistle",
              datePlanted: "02-20-2019",
              dateHarvested: null,
              notes:
                "harvest thistle throughout season, begin producing mid July"
            }
          ],
          plotNotes: "flower bed located at NW side of front field, full sun"
        }
      ]
    };
  }

  handleClickCancel = () => {
    this.props.history.push("/dash");
  };

  handleSubmitNewGarden = plot => {
    console.log("new plot: ", plot)
    const newPlots = [...this.state.plots]
    newPlots.push(plot)
    console.log(newPlots)
    this.setState({ plots: newPlots });
  };

  render() {
    const contextValue = {
      plots: this.state.plots,
      handleSubmitNewGarden: this.handleSubmitNewGarden,
      handleClickCancel: this.handleClickCancel,
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
              <Route component={PageNotFound} />
            </Switch>
          </GardenContext.Provider>
        </main>
      </Fragment>
    );
  }
}

export default withRouter(App);
