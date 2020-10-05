import React, { Component } from "react";
import axios from "axios";
// import { Link } from "react-router-dom";
import TaskList from "../TaskList/TaskList";

export default class CollabTask extends Component {
  state = {
    tasks: [],
  };

  componentDidMount() {
    this.getTasksFromDB();
  }

  getTasksFromDB = () => {
    const userId = this.props.user;
    console.log("userId", userId);
    axios
      .get("/api/tasks")
      .then((response) => {
        console.log("in Task response", response);
        const filtered = response.data.filter(
          (res) => res.collaborators === userId._id
        );
        //   console.log("filetered data", filtered)
        this.setState({
          tasks: filtered,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <div>
        <TaskList tasks={this.state.tasks} />
      </div>
    );
  }
}
