import React, { Component } from "react";
import axios from "axios";
import EditTask from "../EditTask/EditTask";
import Logout from "../Logout/Logout";
import Sidebar from "../Sidebar/Sidebar";
import { Alert, Button, Container, Row, Col } from "react-bootstrap";
import { Trash } from "react-bootstrap-icons";
import Sidebar from "../Sidebar/Sidebar";

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
    console.log("name,value", name, value);
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const id = this.props.match.params.id;
    axios
      .put(`/api/tasks/${id}`, {
        // task: this.state.data,
        title: this.state.title,
        notes: this.state.notes,
        deadline: this.state.deadline,
        collaborators: this.state.collaborators,
        status: this.state.status,
      })
      .then((response) => {
        this.setState({
          title: response.data.title,
          notes: response.data.notes,
          deadline: response.data.deadline,
          collaborators: response.data.collaborators,
          status: response.data.status,
          editForm: false,
        });
        console.log("done");
        this.props.history.push("/dashboard");
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

  statusChange = (event) => {
    // console.log(event)
    this.setState({
      status: event.name,
    });
  };

  collabChange = (event) => {
    console.log(event);
    this.setState({
      collaborators: event.value,
    });
  };

  render() {
    if (this.state.error) return <div>{this.state.error}</div>;
    if (!this.state.task) return <p>Loading....</p>;
    return (
      <Container fluid>
        <Row>
          <Sidebar user={this.props.user} clearUser={this.props.setUser} />
          <Col>
            <Row>
              <Logout user={this.props.user} clearUser={this.props.setUser} />
            </Row>
            <Row>
              <Col style={{ height: "90vh" }}>
                <h2>
                  {this.state.title} <span>{this.state.status}</span>
                </h2>
                <p>Deadline: {this.state.deadline}</p>
                <Alert variant="secondary">
                  <Alert.Heading>Notes</Alert.Heading>
                  <p>{this.state.notes}</p>
                  <hr />
                  <p className="mb-0">
                    Whenever you need to, be sure to use margin utilities to
                    keep things nice and tidy.
                  </p>
                </Alert>

                {this.state.collaborators.length > 0 && <h4>Collaborators</h4>}
                <ul>
                  {this.state.collaborators.map((collab) => (
                    <li> {collab.username} </li>
                  ))}
                </ul>

                <Button onClick={this.deleteTask} variant="danger">
                  <Trash />
                </Button>
                <Button onClick={this.toggleEditForm}>Edit Task</Button>
              </Col>
              <Col style={{ backgroundColor: "#F8F8F8", height: "90vh" }}>
                {this.state.editForm && (
                  <EditTask
                    {...this.state}
                    handleChange={this.handleChange}
                    handleSubmit={this.handleSubmit}
                    statusChange={this.statusChange}
                    collabChange={this.collabChange}
                  />
                )}
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}
