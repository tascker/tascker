import React, { Component } from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Navbar from "./components/Navbar/Navbar";
import Tasks from "./components/Tasks/Tasks";
import CreateTask from "./components/CreateTask/CreateTask";
import TaskDetails from "./components/TaskDetails/TaskDetails";

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
        <Navbar user={this.state.user} setUser={this.setUser} />
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
          <Route
            exact
            path="/"
            render={(props) => <Tasks setUser={this.setUser} {...props} />}
          />
          <Route
            exact
            path="/create-task"
            render={(props) => <CreateTask setUser={this.setUser} {...props} />}
          />
          <Route
            exact
            path="/:id"
            render={(props) => (
              <TaskDetails setUser={this.setUser} {...props} />
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
