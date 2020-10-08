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

  // handleSubmit = (event) => {
  //   event.preventDefault();
  //   const id = this.props.match.params.id;
  //   axios
  //     .put(`/api/tasks/${id}`, {
  //       title: this.state.title,
  //       notes: this.state.notes,
  //       deadline: this.state.deadline,
  //       status: this.state.status,
  //       pinned: this.state.pinned,
  //     })
  //     .then((response) => {
  //       this.setState({
  //         project: response.data,
  //         title: response.data.title,
  //         notes: response.data.notes,
  //         deadline: response.data.deadline,
  //         status: this.state.status,
  //         pinned: this.state.pinned,
  //       });
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

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
        // this.props.history.push("/dashboard");
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
                  height: "7vh",
                  paddingTop: "8px",
                  backgroundColor: "#f4f5f6",
                  borderBottom: "1px solid #d0d0d0",
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
              <Col style={{ paddingTop: "15px" }}>
                <h2 className="dashboard-heading">My tasks</h2>
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
                      paddingTop: "15px",
                    }}
                  >
                    <h2 className="dashboard-heading">Pinned Task</h2>
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
                    <h2 className="dashboard-heading">My collab tasks</h2>
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
