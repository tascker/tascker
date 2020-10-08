import React, { Component } from "react";
import { signup } from "../services/auth";
import DeptSelect from "./DeptSelect";
// import Alert from "@material-ui/lab/Alert";
import Select from 'react-select'

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
    name: "",
    label: "",
    error: "",
    //  selectOptions : [],    //added now
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
        this.props.history.push("/dashboard");
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
        this.props.setUser(data);
        this.props.history.push("/login");
      }
    });
  };

  setQuery = (query) => {
    this.setState({
      department: query,
    });
    console.log("in query", query)
  };

  selectChange = (event) => {
    console.log("event", event.value);
    this.setQuery(event.value);
  };


  render() {
    console.log("in sign up", this.props.selectOption)
    return (
      <div className="auth">
        <h2>Signup</h2>
        <div className="authContainer login">
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

            {/* <label htmlFor="department">Department</label>
            <DeptSelect
              options={this.state.options}
              // <Select options={this.state.selectOptions} />
              setQuery={this.setQuery}
              department={this.state.department}
            /> */}

            <Select options={this.props.selectOption} onChange={this.selectChange} department={this.state.department} />
            <p>{this.state.department}</p>

            <button type="submit">Signup</button>
          </form>
        </div>
        {this.state.message && <p>{this.state.message}</p>}
      </div>
    );
  }
}
