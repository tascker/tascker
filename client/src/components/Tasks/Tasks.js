import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import TaskList from "../TaskList/TaskList";
import Search from "../Search/Search";
import CollabTask from "./CollabTask";

export default class Tasks extends Component {
  state = {
    search: "",
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
        // console.log("in Task response", response);
        const filtered = response.data.filter(
          (res) => res.owner === userId._id && res.collaborators.length === 0
        );
        this.setState({
          tasks: filtered,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  submitHandler = (event) => {
    event.preventDefault();
  };

  searchHandler = (event) => {
    console.log("search", event.target.value);
    const searchInput = event.target.value;

    this.setState({
      search: searchInput,
    });
  };

  render() {
    return (
      <div>
        <Search
          search={this.state.search}
          submitHandler={this.submitHandler}
          searchHandler={this.searchHandler}
        />
        <h2>My Tasks</h2>
        <TaskList tasks={this.state.tasks} search={this.state.search} />
        <h2>My collab tasks</h2>
        <CollabTask user={this.state.user} {...this.props} />
        {/* here list only tasks with collaborators */}
        <Link to="/create-task">Add a new Task</Link>
      </div>
    );
  }
}
