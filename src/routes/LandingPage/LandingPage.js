import React, { Component, Fragment } from "react";
import RegistrationForm from "../../components/RegistrationForm/RegistrationForm";
import arrugula from "../../images/vegetables.jpg";
import examplebar from '../../images/bar.png'
import "./LandingPage.css";

class LandingPage extends Component {
  render() {
    return (
      <Fragment>
        <section className="lp-section">
          <h2 className="lp-heading">Join</h2>
          <RegistrationForm />
        </section>
        <section className="lp-section">
          <h2 className="lp-heading">Plot Your Garden</h2>
          <img src={arrugula} alt="row of baby arugula" className="lp-image" />
          <p className="lp-p">
            Garden Plot helps you keep track of your garden! Record what you
            planted where and when.
          </p>
        </section>
        <section className="lp-section">
          <h2 className="lp-heading">Visualize Growth</h2>
          <img src={examplebar} alt="bar graph" className="lp-image" />
          <p className="lp-p">
            Garden Plot helps you to visualize your garden! Garden Plot
            automatically generates charts to help you to visualize and organize
            your plot
          </p>
        </section>
      </Fragment>
    );
  }
}

export default LandingPage;
