import React, { Component } from "react";
import "./Login.css";

class Login extends Component {
  handleSubmit = e => {
    e.preventDefault();
    console.log("login button, activate!");
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Username..."
            aria-required="true"
            onChange={this.context.handleUsernameChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password..."
            aria-required="true"
            required
          />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    );
  }
}

export default Login;
