import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import TaskList from "../TaskList/TaskList";
import Search from "../Search/Search";
import CollabTask from "./CollabTask"

export default class Tasks extends Component {
  state = {
    tasks: [],
  };

  componentDidMount() {
    this.getTasksFromDB();
  }

  getTasksFromDB = () => {
    const userId = this.props.user
    console.log("userId", userId)
    axios
      .get("/api/tasks")
      .then((response) => {
        // console.log("in Task response", response);
        const filtered = response.data.filter(res => res.owner === userId._id)
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
        <h2>My Tasks</h2>
        <Search tasks={this.state.tasks} />
        {/* this renders all tasks, it should be divided */}
        <TaskList tasks={this.state.tasks} />
        <h2>My collaborated tasks</h2>
        <CollabTask user={this.state.user} {...this.props} />
        {/* here list only tasks with collaborators */}
        <Link to="/create-task">Add a new Task</Link>
      </div>
    );
  }
}
