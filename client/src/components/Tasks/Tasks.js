import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import TaskList from "../TaskList/TaskList";
import Search from "../Search/Search";
import CollabTask from "../CollabTask/CollabTask";
import { Button, Container, Row, Col } from "react-bootstrap";
import Logout from "../Logout/Logout";

import EditTask from "../EditTask/EditTask";

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
    let newPinnedValue = !this.state.pinned;
    this.setState((state) => ({
      pinned: newPinnedValue,
    }));
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
        //this.props.history.push("/dashboard");
        // window.location.reload()
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Sidebar user={this.props.user} clearUser={this.props.setUser} />
          <Col>
            <Row>
              <Logout user={this.props.user} clearUser={this.props.setUser} />
            </Row>
            <Row>
              <Col
                style={{
                  height: "10vh",
                }}
              >
                <Search
                  search={this.state.search}
                  submitHandler={this.submitHandler}
                  searchHandler={this.searchHandler}
                />
              </Col>
            </Row>
            <Row>
              <Col style={{ backgrounColor: "#EDEDED" }}>
                <h2>My Tasks</h2>
                <TaskList
                  tasks={this.state.tasks}
                  search={this.state.search}
                  changePinned={this.changePinned}
                />
              </Col>
              <Col>
                <Row>
                  <Col
                    style={{
                      height: "30vh",
                    }}
                  >
                    <h2>Pinned Task</h2>
                    <TaskList
                      tasks={this.state.pinnedTasks}
                      search={this.state.search}
                      changePinned={this.changePinned}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col
                    style={{
                      height: "30vh",
                    }}
                  >
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
          </Col>
        </Row>
      </Container>
    );
  }
}
