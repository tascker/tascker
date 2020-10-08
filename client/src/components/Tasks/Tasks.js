import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import TaskList from "../TaskList/TaskList";
import Search from "../Search/Search";
import CollabTask from "../CollabTask/CollabTask";
import EditTask from "../EditTask/EditTask";
// import PinnedTask from "./PinnedTask"

export default class Tasks extends Component {
  state = {
    search: "",
    tasks: [],
    editForm: false,
    title: "",
    notes: "",
    deadline: "",
    status: "",
    pinned: false,
    pinnedTasks: []
  };

  componentDidMount() {
    this.getTasksFromDB();
  }

  getTasksFromDB = () => {
    const userId = this.props.user;

    // console.log("userId", userId)
    axios
      .get("/api/tasks")
      .then((response) => {
        // console.log("in Task response", response);
        const filtered = response.data.filter(
          (res) => res.owner === userId._id && res.collaborators.length === 0 && !res.pinned
        );

        const pinnedTasks = response.data.filter(
          (res) => (res.owner === userId._id && res.pinned)
        )

        this.setState({
          tasks: filtered,
          pinnedTasks: pinnedTasks
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const id = this.props.match.params.id;
    axios
      .put(`/api/tasks/${id}`, {
        title: this.state.title,
        notes: this.state.notes,
        deadline: this.state.deadline,
        status: this.state.status,
        pinned: this.state.pinned
      })
      .then((response) => {
        this.setState({
          project: response.data,
          title: response.data.title,
          notes: response.data.notes,
          deadline: response.data.deadline,
          status: this.state.status,
          pinned: this.state.pinned
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  toggleEditForm = () => {
    this.setState((state) => ({
      editForm: !state.editForm,
    }));
  };

  submitHandler = (event) => {
    event.preventDefault();
  };

  searchHandler = (event) => {
    // console.log("search", event.target.value);
    const searchInput = event.target.value;

    this.setState({
      search: searchInput,
    });
  };

  changePinned = (id) => {
    let newPinnedValue = !this.state.pinned
    this.setState((state) => ({
      pinned: newPinnedValue
    }))
    console.log("pin", newPinnedValue, id)
    axios
      .patch(`/api/tasks/${id}`, {
        pinned: newPinnedValue
      })
      .then((response) => {
        console.log("res in pin", response.data.pinned)
        this.setState({
          // project: response.data,
          status: response.data.pinned
        });
        // this.props.history.push("/dashboard");
        // window.location.reload()
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <Search
          search={this.state.search}
          submitHandler={this.submitHandler}
          searchHandler={this.searchHandler}
        />
        <h2>Tasks</h2>
        <h3>Pinned Task</h3>
        <TaskList tasks={this.state.pinnedTasks} search={this.state.search} changePinned={this.changePinned} />
        <h3>My tasks</h3>
        <TaskList tasks={this.state.tasks} search={this.state.search} changePinned={this.changePinned} />
        <h2>My collab tasks</h2>
        <CollabTask user={this.state.user} search={this.state.search} {...this.props} />
        <Link to="/create-task">Add a new Task</Link>
      </div>
    );
  }
}
