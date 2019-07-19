import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class Nav extends Component {
  render() {
    return (
      <nav role="navigation">
        <NavLink to="/">
          <h1>Garden Plot</h1>
        </NavLink>
      </nav>
    );
  }
}

export default Nav;
