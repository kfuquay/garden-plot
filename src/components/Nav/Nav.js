import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "./Nav.css";

class Nav extends Component {
  render() {
    return (
      <nav role="navigation">
        <NavLink to="/" className="NavLink">
          <h1 className="header">Garden Plot</h1>
        </NavLink>
        <NavLink to="/login" className="NavLink">
          Login
        </NavLink>
      </nav>
    );
  }
}

export default Nav;
