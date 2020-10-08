import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "../../img/logo1.png";

import LottieControl from "./LottieControl";

export default class Home extends Component {
  render() {
    return (
      <div style={{ backgroundColor: "lightblue" }}>
        <div style={{ color: "indigo" }} className="landing">
          {/* <img src={logo} style={{ height: 100 }} alt="logo" /> */}
          <h1 style={{ color: "white", fontWeight: "bold" }}>tascker.</h1>
          <h3>get your things done.</h3>
          <LottieControl />

          <div btn-container>
            {/* <Button primary label="signup" />
            <Button primary label="login" /> */}

            <Link to="/signup">
              <button className="btn-signup">signup</button>
            </Link>
            <Link to="/login">
              <button className="btn-login">login</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
