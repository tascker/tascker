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
    pinned: "",
    pinnedTasks: [],
    collabTasks: [],
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

        let collabTasksArray = [];
        for (let i = 0; i < response.data.length; i++) {
          if (
            response.data[i].collaborators.includes(userId._id) &&
            !response.data[i].pinned
          )
            collabTasksArray.push(response.data[i]);
        }

        this.setState({
          collabTasks: collabTasksArray,
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

  changePinned = (id, pinned) => {
    // let newPinnedValue = !this.state.pinned;
    this.setState(
      (state) => ({
        pinned: pinned,
      }),
      () => console.log(pinned, "newPinnedValue")
    );
    console.log("pin", pinned, id);

    axios
      .patch(`/api/tasks/${id}`, {
        pinned: pinned,
      })
      .then((response) => {
        console.log("res in pin", response.data.pinned);
        this.setState({
          // project: response.data,
          status: response.data.pinned,
        });
        // this.props.history.push("/dashboard");
        // window.location.reload()
        this.getTasksFromDB();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevState.pinned !== this.state.pinned) {
  //   }
  // }

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
                  pinned={true}
                  changePinned={this.changePinned}
                />
              </Col>
              <Col>
                <Row>
                  <Col
                    style={{
                      height: "30vh",
                      paddingTop: "15px",
                      backgroundColor: "#f4f5f6",
                      paddingTop: "15px",
                      border: "1px solid #d0d0d0",
                      borderRadius: "10px",
                      padding: "3%",
                      margin: "20px",
                    }}
                  >
                    <h2 className="dashboard-heading">Pinned tasks</h2>
                    <TaskList
                      tasks={this.state.pinnedTasks}
                      search={this.state.search}
                      pinned={false}
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
                      collabTasks={this.state.collabTasks}
                      user={this.state.user}
                      search={this.state.search}
                      {...this.props}
                      pinned={true}
                      changePinned={this.changePinned}
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
