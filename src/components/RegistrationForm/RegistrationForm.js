import React, { Component } from "react";

class RegistrationForm extends Component {
  handleSubmitRegistration = e => {
    e.preventDefault();
    console.log("registration button, activate!!!");
  };

  render() {
    return (
      <form onSubmit={this.handleSubmitRegistration}>
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
        <p aria-live="polite" className="lp-small-text">
          Password must be between 8-72 characters and contain at least one
          uppercase, lowercase, number and special character
        </p>
        <div>
          <button type="submit">Sign Up</button>
        </div>
      </form>
    );
  }
}

export default RegistrationForm;
