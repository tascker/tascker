import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import TaskList from "../TaskList/TaskList";
import Search from "../Search/Search";

export default class Tasks extends Component {
  state = {
    tasks: [],
  };

  componentDidMount() {
    this.getTasksFromDB();
  }

  getTasksFromDB = () => {
    axios
      .get("/api/tasks")
      .then((response) => {
        // console.log("response", response);
        this.setState({
          tasks: response.data,
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
        <h2>My collab tasks</h2>
        {/* here list only tasks with collaborators */}
        <Link to="/create-task">Add a new Task</Link>
      </div>
    );
  }
}
