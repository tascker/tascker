import React, { Component } from "react";
import CollabSelect from "../CollabSelect/CollabSelect";
import axios from "axios";

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
      <>
        <h1>Create a task</h1>
        <form onSubmit={this.submitHandler}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            value={this.state.title}
            onChange={this.changeHandler}
          />

          <label htmlFor="notes">Notes</label>
          <textarea
            name="notes"
            id="notes"
            value={this.state.notes}
            onChange={this.changeHandler}
          ></textarea>

          <label htmlFor="deadline">Deadline</label>
          <input
            type="date"
            name="deadline"
            id="deadline"
            value={this.state.deadline}
            onChange={this.changeHandler}
          />

          <label htmlFor="collaborators">Collaborators</label>
          <CollabSelect
            //options={this.state.options}
            setQuery={this.setQuery}
          //collaborators={this.state.collaborators}
          />
          <button type="submit">Create</button>
        </form>
      </>
    );
  }
}
