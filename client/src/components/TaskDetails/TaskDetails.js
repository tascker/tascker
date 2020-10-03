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
  };

  getTaskFromDB = () => {
    const id = this.props.match.params.id;

    axios.get(`/api/taks/${id}`).then((response) => {
      console.log("details data.response", response.data);
      this.setState({
        task: response.data,
        title: response.data.title,
        notes: response.data.notes,
      });
    });
  };

  render() {
    return (
      <div>
        <h2>Detailed view</h2>
      </div>
    );
  }
}
