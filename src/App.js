import React, { Fragment } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import LandingPage from "./routes/LandingPage/LandingPage";
import Nav from "./components/Nav/Nav";
import Login from "./routes/Login/Login";
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
        </Switch>
      </main>
    </Fragment>
  );
}

export default withRouter(App);
