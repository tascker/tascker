import React, { Component } from "react";
import "./App.css";
import { Redirect, Route, Switch } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import CreateTask from "./components/CreateTask/CreateTask";

class App extends Component {
  state = {
    user: this.props.user,
  };

  setUser = (user) => {
    this.setState({
      user: user,
    });
  };

  render() {
    return (
      <div className="App">
        <h1>tascker</h1>
        <Switch>
          <Route
            exact
            path="/signup"
            render={(props) => <Signup setUser={this.setUser} {...props} />}
          />
          <Route
            exact
            path="/login"
            render={(props) => <Login setUser={this.setUser} {...props} />}
          />
          <CreateTask to="createtask" />
        </Switch>
      </div>
    );
  }
}

export default App;
