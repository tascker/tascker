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
      <div className="auth">
        <div class="login-container">
          <h2>login</h2>

          <form onSubmit={this.handleSubmit} id="form-container">
            <div class="input-container">
              <label htmlFor="username">Username: </label>
              <input
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.handleChange}
                id="username"
              />
            </div>

            <div class="input-container">
              <label htmlFor="password">Password: </label>
              <input
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleChange}
                id="password"
              />
            </div>

            <p class="account-message">
              Not registered yet? <a href="/signup">Signup</a>
            </p>
          </form>
        </div>
        {this.state.message && <p>{this.state.message}</p>}
      </div>
    );
  }
}
