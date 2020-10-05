import React, { Component } from "react";
import axios from "axios";

export default class TaskDetails extends Component {
  state = {
    task: null,
    error: null,
    title: "",
    notes: "",
    deadline: "",
    collaborators: {},
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
        console.log("details data.response", response);
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

  render() {
    return (
      <div>
        <h2>{this.state.title}</h2>
        <p>{this.state.notes}</p>
        <p>{this.state.deadline}</p>
        {/* collaborators are not coming in when creating a task */}
        {/* <p>{this.state.collaborators}</p> */}
        <p>{this.state.status}</p>
      </div>
    );
  }
}
