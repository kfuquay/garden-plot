import React, { Component, Fragment } from "react";
import RegistrationForm from "../../components/RegistrationForm/RegistrationForm";
import AuthApiService from "../../services/auth-api-service";
import TokenService from "../../services/token-service";
import LoadingIndicator from "../../components/LoadingIndicator/LoadingIndicator";
import arrugula from "../../images/vegetables.jpg";
import examplebar from "../../images/bar.png";
import "./LandingPage.css";

class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoading: false
    };
  }

  handleDemo = e => {
    e.preventDefault();
    this.setState({ error: null, isLoading: true });

    const username = "test";
    const password = "Testing123!";

    AuthApiService.postLogin({
      username: username.value,
      password: password.value
    })
      .then(res => {
        this.context.setCurrentUser(username);
        this.context.setCurrentUserId(res.user_id);
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
      <Fragment>
        {this.state.isLoading && this.state.error === null ? (
          <LoadingIndicator />
        ) : (
          <Fragment>
            <section className="lp-section">
              <h2 className="heading">Join</h2>
              <RegistrationForm />
            </section>
            <section className="lp-section">
              <h2 className="heading">Plot Your Garden</h2>
              <img
                src={arrugula}
                alt="row of baby arugula"
                className="lp-image"
              />
              <p className="lp-p">
                Garden Plot helps you keep track of your garden! Record what you
                planted where and when.
              </p>
            </section>
            <section className="lp-section">
              <h2 className="heading">Visualize Growth</h2>
              <img src={examplebar} alt="bar graph" className="lp-image" />
              <p className="lp-p">
                Garden Plot helps you to visualize your garden! Garden Plot
                automatically generates charts to help you to visualize and
                organize your plot
              </p>
            </section>
            <section className="lp-section">
              <header className="large-text">
                <h3>Demo</h3>
              </header>
              <p className="lp-text text">
                <button
                  className="lp-text text"
                  id="unbutton"
                  onClick={this.handleDemo}
                >
                  Click
                </button>{" "}
                through to demo Garden Plot
              </p>
            </section>
          </Fragment>
        )}
      </Fragment>
    );
  }
}

export default LandingPage;
