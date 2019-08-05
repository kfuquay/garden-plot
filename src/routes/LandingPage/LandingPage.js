import React, { Component, Fragment } from "react";
import RegistrationForm from "../../components/RegistrationForm/RegistrationForm";
import AuthApiService from "../../services/auth-api-service";
import TokenService from "../../services/token-service";
import LoadingIndicator from "../../components/LoadingIndicator/LoadingIndicator";
import arrugula from "../../images/vegetables.jpg";
import examplepie from "../../images/pie.png";
import GardenContext from "../../context/GardenContext";
import "./LandingPage.css";

class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoading: false
    };
  }

  static contextType = GardenContext;

  handleDemo = e => {
    e.preventDefault();
    this.setState({ error: null, isLoading: true });

    const username = "test";
    const password = "Testing123!";

    AuthApiService.postLogin({
      username: username,
      password: password
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
              <img src={examplepie} alt="bar graph" className="lp-image" />
              <p className="lp-p">
                Garden Plot helps you to visualize your garden! Garden Plot
                automatically generates charts to help you to visualize and
                organize your plot
              </p>
            </section>
            <section className="lp-section">
              <h2 className="heading">Demo</h2>
              <button
                type="button"
                className="demo-button"
                onClick={this.handleDemo}
              >
                Demo
              </button>{" "}
              <p className="lp-text text">
                Click through to see what Garden Plot can do!
              </p>
            </section>
          </Fragment>
        )}
      </Fragment>
    );
  }
}

export default LandingPage;
