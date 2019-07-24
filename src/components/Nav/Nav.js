import React, { Component, Fragment } from "react";
import GardenContext from "../../context/GardenContext";
import { NavLink } from "react-router-dom";
import TokenService from "../../services/token-service";
import "./Nav.css";

class Nav extends Component {
  static contextType = GardenContext;

  handleLogoutClick = () => {
    this.context.setCurrentUser("");
    TokenService.clearAuthToken();
  };

  // render logout and add project links only if user is currently logged in
  renderLogoutLink() {
    return (
      <Fragment>
        <NavLink to="/new" className="NavLink">
          <i className="fas fa-plus icon" />
        </NavLink>
        <NavLink to="/dash" className="NavLink">
          Dash
        </NavLink>
        <NavLink
          className="NavLink"
          onClick={this.handleLogoutClick}
          to="/login"
        >
          Logout
        </NavLink>
      </Fragment>
    );
  }

  //if user is not logged in, render login link
  renderLoginLink() {
    return (
      <NavLink to="/login" className="NavLink">
        Log In
      </NavLink>
    );
  }
  render() {
    return (
      <nav role="navigation">
        <NavLink to="/" className="NavLink">
          <h1 className="header">
            <i className="fas fa-carrot" />
            Garden Plot
          </h1>
        </NavLink>
        <div>
          {TokenService.hasAuthToken()
            ? this.renderLogoutLink()
            : this.renderLoginLink()}
        </div>
      </nav>
    );
  }
}

export default Nav;
