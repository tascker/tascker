import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "../../img/logo1.png";

export default class Home extends Component {
  render() {
    return (
      <div>
        <div className="landing">
          <img src={logo} style={{ height: 100 }} alt="logo" />

          <Link to="/signup">
            <button>SIGNUP</button>
          </Link>
          <Link to="/login">
            <button>LOGIN</button>
          </Link>
        </div>
      </div>
    );
  }
}
