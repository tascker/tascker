import React, { Component } from "react";
import { login } from "../services/auth";

export default class Login extends Component {
  state = {
    username: "",
    password: "",
    message: "",
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { username, password } = this.state;
    login(username, password).then((data) => {
      if (data.message) {
        this.setState({
          message: data.message,
          username: "",
          password: "",
        });
      } else {
        this.props.setUser(data);
        this.props.history.push("/dashboard");
      }
    });
  };
  render() {
    return (
      <div style={{ backgroundColor: "#f9fafc" }} className="login-form">
        <div className="login-container">
          <h2 style={{ fontWeight: "bold" }}>login</h2>
          <br></br>

          <form onSubmit={this.handleSubmit} id="form-container">
            <div className="input-container">
              <label htmlFor="username"></label>
              <input
                className="input"
                type="text"
                name="username"
                placeholder="username"
                value={this.state.username}
                onChange={this.handleChange}
                id="username"
              />
            </div>

            <div className="input-container">
              <label htmlFor="password"></label>
              <input
                className="input"
                type="password"
                name="password"
                placeholder="password"
                value={this.state.password}
                onChange={this.handleChange}
                id="password"
              />
            </div>

            <div className="errormsg"></div>
            <br></br>
            <button className="btn-signup">
              <span>Login</span>
            </button>
            <p>
              Don't have an account? <a href="/signup">Sign up</a>
            </p>
          </form>
        </div>
        {this.state.message && <p>{this.state.message}</p>}
      </div>
    );
  }
}
