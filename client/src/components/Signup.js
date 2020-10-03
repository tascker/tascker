import React, { Component } from "react";
import { signup } from "../services/auth";
import DeptSelect from "./DeptSelect";

export default class Signup extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    department: "",
    message: "",
    options: [
      { name: "Business Operations", label: "Business Operations" },
      { name: "HR", label: "HR" },
      { name: "Marketing & Sales", label: "Marketing & Sales" },
      { name: "Finance", label: "Finance" },
      { name: "IT", label: "IT" },
      { name: "Software", label: "Software" },
    ],
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
        this.props.history.push("/");
      }
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
        //now we need to put user in the user key of the state of App.js
        this.props.setUser(data);

        //redirect to /projects
        this.props.history.push("/");
      }
    });
  };
  setQuery = (query) => {
    this.setState({
      department: query,
    });
  };

  render() {
    return (
      <>
        <h2>Signup</h2>

        <form onSubmit={this.handleSubmit}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            value={this.state.username}
            onChange={this.handleChange}
            id="username"
          />

          <label htmlFor="email">email</label>
          <input
            type="text"
            name="email"
            value={this.state.email}
            onChange={this.handleChange}
            id="email"
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
          <DeptSelect
            options={this.state.options}
            setQuery={this.setQuery}
            department={this.state.department}
          />
          <button type="submit">Signup</button>
        </form>
      </>
    );
  }
}
