import React, { Component } from "react";
import axios from "axios";
import EditTask from "../EditTask/EditTask";
import Search from "../Search/Search";
import Logout from "../Logout/Logout";
import {
  Button,
  Container,
  Row,
  Col,
  Form,
  FormLabel,
  FormControl,
} from "react-bootstrap";
import { Trash } from "react-bootstrap-icons";

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
        // collaborators: this.state.collaborators,
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

  render() {
    if (this.state.error) return <div>{this.state.error}</div>;
    if (!this.state.task) return <p>Loading....</p>;
    return (
      <Container>
        <Row>
          {" "}
          <Col
            xs={2}
            md={2}
            style={{ backgroundColor: "#f4f5f6", height: "100vh" }}
          ></Col>
          <Col>
            <Row>
              <Col
                style={{
                  display: "flex",
                  flexDirection: "row-reverse",
                  alignItems: "center",
                  height: "10vh",
                }}
              >
                <Logout user={this.props.user} clearUser={this.props.setUser} />
              </Col>
            </Row>
            <Row>
              <Col>
                <h2>{this.state.title}</h2>
                <span>{this.state.status}</span>
                <p>{this.state.notes}</p>
                <p>{this.state.deadline}</p>
                {this.state.collaborators.length > 0 && <h4>Collaborators</h4>}
                <ul>
                  {" "}
                  {this.state.collaborators.map((collab) => (
                    <li> {collab.username} </li>
                  ))}
                </ul>

                <Button onClick={this.deleteTask} variant="danger">
                  <Trash />
                </Button>

                <Button onClick={this.toggleEditForm}>Edit Task</Button>
              </Col>
              <Col>
                {this.state.editForm && (
                  <EditTask
                    {...this.state}
                    handleChange={this.handleChange}
                    handleSubmit={this.handleSubmit}
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
