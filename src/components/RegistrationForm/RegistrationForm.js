import React, { Component } from "react";
import GardenContext from "../../context/GardenContext";
import AuthApiService from "../../services/auth-api-service";
import TokenService from "../../services/token-service";

class RegistrationForm extends Component {
  static defaultProps = {
    onRegistrationSuccess: () => {}
  };

  static contextType = GardenContext;

  state = { error: null, isLoading: false };

  //check user input against users table in db, ensure user input matches required parameters (password must be at least 8 chars etc.)
  //TODO: show LoadingIndicator/spinner whilst waiting for response from server
  //on successful registration, store username and userid in high level state using context
  handleSubmitRegistration = e => {
    e.preventDefault();
    const { username, password } = e.target;
    this.setState({ error: null, isLoading: true });
    AuthApiService.postUser({
      username: username.value,
      password: password.value
    })
      .then(res => {
        AuthApiService.postLogin({
          username: username.value,
          password: password.value
        }).then(res => {
          this.context.setCurrentUser(username.value);
          this.context.setCurrentUserId(res.user_id);
          username.value = "";
          password.value = "";
          TokenService.saveAuthToken(res.authToken);
          this.setState({ isLoading: false });
          this.context.handleLoginSuccess();
        });
      })
      .catch(res => {
        this.setState({ error: res.error });
      });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmitRegistration}>
        {/* if there is a registration error - ie username already taken - display error here */}
        {this.state.error !== null && this.state.error !== undefined ? (
          <p className="error">{this.state.error}</p>
        ) : (
          ""
        )}
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
