import React, { Component } from "react";
import CollabSelect from "../CollabSelect/CollabSelect";
import axios from "axios";
import {
  Button,
  Container,
  Row,
  Col,
  Form,
  FormLabel,
  FormControl,
} from "react-bootstrap";

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
      <Container>
        <Row>
          <Col
            xs={2}
            md={2}
            style={{ backgroundColor: "#f4f5f6", height: "100vh" }}
          ></Col>
          <Col>
            <h1>Create a task</h1>
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
              <CollabSelect
                //options={this.state.options}
                setQuery={this.setQuery}
                //collaborators={this.state.collaborators}
              />
              <Button type="submit">Create</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}
