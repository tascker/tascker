import React, { Component } from "react";
import axios from "axios";

export default class TaskDetails extends Component {
  state = {
    task: null,
    error: null,
    title: "",
    notes: "",
    deadline: "",
    collaborators: [],
    status: "",
  };

  componentDidMount() {
    this.getTaskFromDB();
  }

  getTaskFromDB = () => {
    const id = this.props.match.params.id;

    axios
      .get(`/api/tasks/${id}`)
      .then((response) => {
        this.setState({
          task: response.data,
          title: response.data.title,
          notes: response.data.notes,
          deadline: response.data.deadline,
          collaborators: response.data.collaborators,
          status: response.data.status,
        });
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  deleteTask = () => {
    const id = this.props.match.params.id;
    console.log(this.props.match.params.id);
    axios
      .delete(`/api/tasks/${id}`)
      .then(() => {
        this.props.history.push("/dashboard");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    console.log("is this working?", this.state.collaborators);
    return (
      <div>
        <h2>{this.state.title}</h2>
        <p>{this.state.notes}</p>
        <p>{this.state.deadline}</p>
        <p>Collabs for this task:</p>
        <ul>
          {this.state.collaborators.map((collab) => (
            <li> {collab.username} </li>
          ))}
        </ul>
        <p>{this.state.status}</p>
        <button onClick={this.deleteTask}>Delete Task</button>
      </div>
    );
  }
}
