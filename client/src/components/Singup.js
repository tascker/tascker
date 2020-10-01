import React, { Component } from "react";
import { signup } from "../services/auth";
import DepartmentSelect from "./DepartmentSelect";

export default class Singup extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    department: "",
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
    const { username, email, password, department } = this.state;

    signup(username, email, password, department).then((data) => {
      if (data.message) {
        this.setState({
          message: data.message,
          username: "",
          email: "",
          password: "",
          department: "",
        });
      } else {
        this.props.setUser(data);
        this.props.history.push("/tasklist");
      }
    });
  };

  render() {
    return (
      <>
        <h2>Signup</h2>

        <form>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            value={this.state.username}
            onChange={this.handleChange}
            id="username"
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
            id="password"
          />

          <label htmlFor="department">Department</label>
          <DepartmentSelect />
          <button type="submit">Signup</button>
        </form>
      </>
    );
  }
}
