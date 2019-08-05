import React, { Component, Fragment } from "react";
import GardenContext from "../../context/GardenContext";
import AuthApiService from "../../services/auth-api-service";
import TokenService from "../../services/token-service";
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator";

class RegistrationForm extends Component {
  static defaultProps = {
    onRegistrationSuccess: () => {}
  };

  static contextType = GardenContext;

  state = { error: null, isLoading: false };

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
      <Fragment>
        {this.state.isLoading && this.state.error === null ? (
          <LoadingIndicator />
        ) : (
          <form onSubmit={this.handleSubmitRegistration}>
            {/* if there is a registration error - ie username already taken - display error here */}
            {this.state.error !== null && this.state.error !== undefined ? (
              <p className="error">{this.state.error}</p>
            ) : (
              ""
            )}
            <div>
              <label className="conditional-label" htmlFor="username">
                Username:
              </label>
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
              <label className="conditional-label" htmlFor="password">
                Password:
              </label>
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
        )}
      </Fragment>
    );
  }
}

export default RegistrationForm;
