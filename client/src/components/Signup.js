import React, { Component } from "react";
import { signup } from "../services/auth";
import DeptSelect from "./DeptSelect";
// import Alert from "@material-ui/lab/Alert";
import Select from "react-select";

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
    console.log("in query", query);
  };

  selectChange = (event) => {
    console.log("event", event.value);
    this.setQuery(event.value);
  };

  render() {
    console.log("in sign up", this.props.selectOption);
    return (
      <div className="login-form">
        <div className="login-container">
          <h2 style={{ fontWeight: "bold" }}>signup</h2>
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
              <label htmlFor="email"></label>
              <input
                className="input"
                type="text"
                name="email"
                placeholder="email"
                value={this.state.email}
                onChange={this.handleChange}
                id="email"
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

            <div className="department">
              <div>
                <label htmlFor="department"></label>
                <DeptSelect
                  // className="input"
                  // style={{ width: "40vw" }}
                  options={this.state.options}
                  setQuery={this.setQuery}
                  department={this.state.department}
                />
              </div>
            </div>

            <button className="btn-signup" type="submit">
              Signup
            </button>

            <p class="account-message">
              Already have an account? <a href="/login">Login</a>
            </p>
          </form>
        </div>
        {this.state.message && <p className="alert">{this.state.message}</p>}
      </div>
    );
  }
}
