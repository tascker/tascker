import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import TaskList from "../TaskList/TaskList";
import Search from "../Search/Search";
import CollabTask from "../CollabTask/CollabTask";
import { Button, Container, Row, Col } from "react-bootstrap";
import Logout from "../Logout/Logout";

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
        //  console.log("in Task response", response);
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
      <Container>
        <Row>
          <Col xs={2} md={2}>
            <Button to="/create-task">Add a new Task</Button>
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
                  {...this.props}
                />
              </Col>
              <Col>
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
