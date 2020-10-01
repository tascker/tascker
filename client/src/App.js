import React, { Component } from "react";
import "./App.css";
import { Route } from "react-router-dom";
import Signup from "./components/Signup";

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
        <Route
          exact
          path="/signup"
          render={(props) => <Signup setUser={this.setUser} {...props} />}
        />
      </div>
    );
  }
}

export default App;
