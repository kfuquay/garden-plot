import React, { Fragment } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import LandingPage from "./routes/LandingPage/LandingPage";
import Nav from "./components/Nav/Nav";
import Dash from "./routes/Dash/Dash";
import Login from "./routes/Login/Login";
import PageNotFound from "./components/PageNotFound/PageNotFound";
import "./App.css";

function App() {
  return (
    <Fragment>
      <header>
        <Nav />
      </header>
      <main className="App">
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/login" component={Login} />
          <Route path="/dash" component={Dash} />
          <Route component={PageNotFound} />
        </Switch>
      </main>
    </Fragment>
  );
}

export default withRouter(App);
