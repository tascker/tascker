import React, { Component } from "react";
import "./App.css";
import { Route, Redirect } from "react-router-dom";
import Home from "./components/Home/Home";
// import Auth from "./components/Auth.js";
import Signup from "./components/Signup";
import Login from "./components/Login";

import Tasks from "./components/Tasks/Tasks";
// import TaskList from "./components/TaskList/TaskList";
import CreateTask from "./components/CreateTask/CreateTask";
import TaskDetails from "./components/TaskDetails/TaskDetails";
import Select from "react-select";
//UI framework
import "bootstrap/dist/css/bootstrap.min.css";

class App extends Component {
  state = {
    user: this.props.user,
    selectOptions: [],
    options: [
      { name: "Business Operations", label: "Business Operations" },
      { name: "HR", label: "HR" },
      { name: "Marketing & Sales", label: "Marketing & Sales" },
      { name: "Finance", label: "Finance" },
      { name: "IT", label: "IT" },
      { name: "Software", label: "Software" },
    ],
  };

  getOptions() {
    const res = this.state.options;

    const options = res.map((d) => ({
      value: d.value,
      label: d.label,
    }));
    this.setState({ selectOptions: options });
  }

  setUser = (user) => {
    this.setState({
      user: user,
    });
  };

  componentDidMount() {
    this.getOptions();
  }

  render() {
    console.log("render", this.state.selectOptions);
    return (
      <div className="App">
        <Route exact path="/" component={Home} />

        <Route
          exact
          path="/signup"
          render={(props) => (
            <Signup
              setUser={this.setUser}
              selectOption={this.state.selectOptions}
              {...props}
            />
          )}
        />

        <Route
          exact
          path="/login"
          render={(props) => <Login setUser={this.setUser} {...props} />}
        />

        <Route
          exact
          path="/dashboard"
          render={(props) => {
            if (this.state.user) {
              return (
                <Tasks
                  {...props}
                  user={this.state.user}
                  setUser={this.setUser}
                />
              );
            } else {
              return <Redirect to="/" />;
            }
          }}
        />

        <Route
          exact
          path="/tasks/:id"
          render={(props) => {
            if (this.state.user) {
              return <TaskDetails {...props} user={this.state.user} />;
            } else {
              return <Redirect to="/" />;
            }
          }}
        />

        <Route
          exact
          path="/create-task"
          render={(props) => <CreateTask user={this.state.user} {...props} />}
        />
      </div>
    );
  }
}

export default App;
