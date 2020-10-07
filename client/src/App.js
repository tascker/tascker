import React, { Component } from "react";
import "./App.css";
import { Route, Redirect } from "react-router-dom";
import Home from "./components/Home/Home";
// import Auth from "./components/Auth.js";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Navbar from "./components/Navbar/Navbar";
import Tasks from "./components/Tasks/Tasks";
// import TaskList from "./components/TaskList/TaskList";
import CreateTask from "./components/CreateTask/CreateTask";
import TaskDetails from "./components/TaskDetails/TaskDetails";
//UI framework
import "bootstrap/dist/css/bootstrap.min.css";

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
        {/* <Navbar user={this.state.user} clearUser={this.setUser} /> */}
        <Route exact path="/" component={Home} />

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
          }
          }
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
