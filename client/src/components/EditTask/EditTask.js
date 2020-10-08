import React, { Component } from "react";
import axios from "axios";
import Select from "react-select";
import { Button, Form } from "react-bootstrap";

export default class EditTask extends Component {
  state = {
    status: "",
    allStatus: [
      { name: "to-do", label: "to-do" },
      { name: "on going", label: "on going" },
      { name: "done", label: "done" },
    ],
    usersList: [],
  };

  getUsersFromDB = () => {
    axios.get("/api/user").then((response) => {
      //   console.log("user", response.data)
      const collabOptions = response.data.map((user) => ({
        value: user._id,
        label: user.username,
      }));
      //  console.log("collab", collabOptions)
      this.setState({
        usersList: collabOptions,
      });
      //   console.log(this.state.usersList)
    });
  };
  render() {
    console.log(this.props.status);
    return (
      <>
        <h2>Edit the task</h2>
        <Form onSubmit={this.props.handleSubmit}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            value={this.props.title}
            onChange={this.props.handleChange}
          />

          <Form.Label htmlFor="notes">Notes</Form.Label>
          <Form.Control
            type="text"
            name="notes"
            value={this.props.notes}
            onChange={this.props.handleChange}
          />

          <Form.Label htmlFor="deadline">Deadline</Form.Label>
          <Form.Control
            type="date"
            name="deadline"
            value={this.props.deadline}
            onChange={this.props.handleChange}
          />

          <Form.Label htmlFor="status">Status</Form.Label>
          <Select
            value={this.props.status}
            options={this.state.allStatus}
            // {<option selected value="this.props.status">{this.props.status}</option>}
            onChange={this.props.statusChange}
          />

          <Form.Label htmlFor="status">Collaborators</Form.Label>
          <Select
            options={this.state.usersList}
            isMulti
            onChange={this.props.collabChange}
          />
          <Button type="submit">Submit</Button>
        </Form>
      </>
    );
  }
}
