import React, { Component } from "react";
import axios from "axios";
import EditTask from "../EditTask/EditTask";

export default class TaskDetails extends Component {
  state = {
    task: null,
    error: null,
    title: "",
    notes: "",
    deadline: "",
    collaborators: [],
    status: "",
    editForm: false,
  };

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
    axios
      .delete(`/api/tasks/${id}`)
      .then(() => {
        this.props.history.push("/dashboard");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const id = this.props.match.params.id;
    axios
      .put(`/api/tasks/${id}`, {
        task: this.state.data,
        title: this.state.title,
        notes: this.state.notes,
        deadline: this.state.deadline,
        collaborators: this.state.collaborators,
        status: this.state.status,
      })
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
        if (error.response.status === 404) {
          this.setState({
            error: "Not Found",
          });
        }
      });
  };

  toggleEditForm = () => {
    this.setState((state) => ({
      editForm: !state.editForm,
    }));
  };

  componentDidMount() {
    this.getTaskFromDB();
  }

  render() {
    if (this.state.error) return <div>{this.state.error}</div>;
    if (!this.state.task) return <p>Loading....</p>;
    return (
      <div>
        <h2>{this.state.title}</h2>
        <p>{this.state.notes}</p>
        <p>{this.state.deadline}</p>

        <p>Collaborators for this task:</p>
        <ul>
          {this.state.collaborators.map((collab) => (
            <li> {collab.username} </li>
          ))}
        </ul>
        <p>{this.state.status}</p>

        <button onClick={this.deleteTask}>Delete</button>
        <button onClick={this.toggleEditForm}>Edit Task</button>

        {this.state.editForm && (
          <EditTask
            {...this.state}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
          />
        )}
      </div>
    );
  }
}
