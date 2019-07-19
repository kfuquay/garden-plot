import React, { Fragment } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
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
          {/* <Route exact path="/" component={} /> */}
          <Route path="/login" component={Login} />
        </Switch>
      </main>
    </Fragment>
  );
}

export default withRouter(App);
