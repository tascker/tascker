import React, { Component } from "react";
import CollabSelect from "../CollabSelect/CollabSelect";
import axios from "axios";
import Logout from "../Logout/Logout";
import { Link } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import { Button, Container, Row, Col, Form } from "react-bootstrap";

export default class CreateTask extends Component {
  state = {
    title: "",
    notes: "",
    deadline: "",
    collaborators: [],
  };

  submitHandler = (event) => {
    event.preventDefault();
    //console.log("user", this.props.user)
    //console.log("collab", this.state.collaborators);

    const { title, notes, deadline } = this.state;
    const owner = this.props.user;

    axios
      .post("/api/tasks", {
        title: title,
        notes: notes,
        deadline: deadline,
        collaborators: this.state.collaborators,
        owner: owner,
      })
      .then(() => {
        this.setState({
          title: "",
          notes: "",
          deadline: "",
          collaborators: [],
        });
        this.props.history.push("/dashboard");
      });
  };

  changeHandler = (event) => {
    const target = event.target;
    // console.log("event target", event.target);

    this.setState({
      [target.name]: target.value,
    });
  };

  setQuery = (query) => {
    this.setState({
      collaborators: query,
    });
    //  console.log("in create collab", this.state.collaborators);
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
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "#f4f5f6",
                  borderBottom: "1px solid #d0d0d0",
                }}
              >
                <Link to="/dashboard">← Dashboard</Link>
              </Col>
            </Row>
            <Row>
              <Col>
                <h2
                  className="dashboard-heading"
                  style={{ paddingTop: "15px" }}
                >
                  Create a task
                </h2>
                <Form onSubmit={this.submitHandler}>
                  <Form.Label htmlFor="title">Title</Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    id="title"
                    value={this.state.title}
                    onChange={this.changeHandler}
                  />

                  <Form.Label htmlFor="notes">Notes</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows="3"
                    name="notes"
                    id="notes"
                    value={this.state.notes}
                    onChange={this.changeHandler}
                  />

                  <Form.Label htmlFor="deadline">Deadline</Form.Label>
                  <Form.Control
                    type="date"
                    name="deadline"
                    id="deadline"
                    value={this.state.deadline}
                    onChange={this.changeHandler}
                  />

                  <Form.Label htmlFor="collaborators">Collaborators</Form.Label>
                  <p>
                    <CollabSelect
                      //options={this.state.options}
                      setQuery={this.setQuery}
                      //collaborators={this.state.collaborators}
                    />
                  </p>

                  <button className="btn-logout" type="submit">
                    Create
                  </button>
                </Form>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}
