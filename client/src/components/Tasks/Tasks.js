import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import TaskList from "../TaskList/TaskList";
import Search from "../Search/Search";
import CollabTask from "../CollabTask/CollabTask";
import { Button, Container, Row, Col } from "react-bootstrap";
import Logout from "../Logout/Logout";

import EditTask from "../EditTask/EditTask";
import PinnedTask from "../PinnedTask/PinnedTask";

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
    pinnedTasks: [],
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
          (res) =>
            res.owner === userId._id &&
            res.collaborators.length === 0 &&
            !res.pinned
        );

        const pinnedTasks = response.data.filter(
          (res) => res.owner === userId._id && res.pinned
        );

        this.setState({
          tasks: filtered,
          pinnedTasks: pinnedTasks,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // handleChange = (event) => {
  //   const { name, value } = event.target;
  //   this.setState({
  //     [name]: value,
  //   });
  // };

  handleSubmit = (event) => {
    event.preventDefault();
    const id = this.props.match.params.id;
    axios
      .put(`/api/tasks/${id}`, {
        title: this.state.title,
        notes: this.state.notes,
        deadline: this.state.deadline,
        status: this.state.status,
        pinned: this.state.pinned,
      })
      .then((response) => {
        this.setState({
          project: response.data,
          title: response.data.title,
          notes: response.data.notes,
          deadline: response.data.deadline,
          status: this.state.status,
          pinned: this.state.pinned,
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

  changePinned = (id) => {
    let newPinnedValue = !this.state.pinned;
    this.setState((state) => ({
      pinned: newPinnedValue,
    }));

    // const id = this.props.match.params.id;
    // const id = this.props.match.params.id;
    console.log("pin", newPinnedValue, id);
    axios
      .patch(`/api/tasks/${id}`, {
        pinned: newPinnedValue,
      })
      .then((response) => {
        console.log("res in pin", response.data.pinned);
        this.setState({
          // project: response.data,
          status: response.data.pinned,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <Container>
        <Row>
          <Col
            xs={2}
            md={2}
            style={{ backgroundColor: "#f4f5f6", height: "100vh" }}
          >
            <Link to="/create-task">
              <Button>Add a new Task</Button>
            </Link>
          </Col>
          <Col>
            <Row>
              <Col
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "stretch",
                }}
              >
                <Search
                  search={this.state.search}
                  submitHandler={this.submitHandler}
                  searchHandler={this.searchHandler}
                />
                <Logout user={this.props.user} clearUser={this.props.setUser} />
              </Col>
            </Row>
            <Row>
              <Col>
                <h2>My Tasks</h2>
                <TaskList
                  tasks={this.state.tasks}
                  search={this.state.search}
                  changePinned={this.changePinned}
                />
              </Col>
              <Col>
                <h2>Pinned Task</h2>
                <TaskList
                  tasks={this.state.pinnedTasks}
                  search={this.state.search}
                  changePinned={this.changePinned}
                />
                <h2>My collab tasks</h2>
                <CollabTask
                  user={this.state.user}
                  search={this.state.search}
                  {...this.props}
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}
