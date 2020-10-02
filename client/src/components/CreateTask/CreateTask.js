import React, { Component } from "react";
import { v4 as uuidv4 } from "uuid";
import CollabSelect from "./CollabSelect";

export default class CreateTask extends Component {
  state = {
    title: "",
    notes: "",
    deadline: "",
    collaborators: {},
  };

  changeHandler = (event) => {
    const target = event.target;
    // console.log("event target", event.target);

    this.setState({
      [target.name]: target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { title, notes, deadline, collaborators } = this.state;

    const newTask = {
      title,
      notes,
      deadline,
      collaborators,
      id: uuidv4(),
    };

    console.log(newTask);

    this.setState((state) => ({
      title: "",
      notes: "",
      deadline: "",
      collaborators: {},
    }));
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
            options={this.state.options}
            // setQuery={this.setQuery}
            collaborators={this.state.collaborators}
          />
          <button type="submit">Create</button>
        </form>
      </>
    );
  }
}
