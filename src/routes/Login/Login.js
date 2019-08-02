import React, { Component } from "react";
import GardenContext from "../../context/GardenContext";
import AuthApiService from "../../services/auth-api-service";
import TokenService from "../../services/token-service";
import "./Login.css";

class Login extends Component {
  // static defaultProps = {
  //   location: {},
  //   history: {
  //     push: () => {}
  //   }
  // };

  static contextType = GardenContext;

  state = { error: null, isLoading: false };

  //log in user,
  // TODO: render LoadingIndicator/spinner whilst waiting for response from server
  handleSubmit = e => {
    e.preventDefault();
    this.setState({ error: null, isLoading: true });
    const { username, password } = e.target;

    AuthApiService.postLogin({
      username: username.value,
      password: password.value
    })
      .then(res => {
        console.log(res)
        this.context.setCurrentUser(username.value);
        this.context.setCurrentUserId(res.user_id);
        username.value = "";
        password.value = "";
        TokenService.saveAuthToken(res.authToken);
        this.setState({ isLoading: false });
        this.context.handleLoginSuccess();
      })
      .catch(res => {
        this.setState({ error: res.error });
      });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        {/* if username and password do not match records, display error */}
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
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    );
  }
}

export default Login;
