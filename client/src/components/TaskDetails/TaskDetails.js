import React, { Component } from "react";
import axios from "axios";
import EditTask from "../EditTask/EditTask";
import Logout from "../Logout/Logout";
import { Link } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import { Alert, Button, Container, Row, Col } from "react-bootstrap";
import { TrashFill } from "react-bootstrap-icons";


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
    this.setState({
      editForm: !this.state.editForm,
    });
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
    console.log(event[0].value, "event");
    this.setState({
      collaborators: [...this.state.collaborators, event[0].value],
    });
  };

  render() {
    console.log(this.state.collaborators)
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
              <Col
                style={{
                  height: "7vh",
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "#f4f5f6",
                  borderBottom: "1px solid #d0d0d0",
                }}
              >
                <Link to="/dashboard">← Dashboard</Link>
              </Col>
            </Row>
            <Row>
              <Col style={{ height: "90vh" }}>
                <h3 style={{ paddingTop: "15px" }}>
                  {this.state.title}
                  <span>
                    {this.state.status === "to-do" ? (
                      <span className="to-do">{this.state.status}</span>
                    ) : this.state.status === "on going" ? (
                      <span className="ongoing">{this.state.status}</span>
                    ) : (
                      <span className="done">{this.state.status}</span>
                    )}
                  </span>
                </h3>
                <p>Deadline: {this.state.deadline}</p>

                <div variant="secondary">
                  <h2 className="dashboard-heading">Notes</h2>
                  <hr />
                  <div className="notes-box">{this.state.notes}</div>
                </div>


                {this.state.collaborators.length > 0 && (
                  <h2 className="dashboard-heading">Collaborators</h2>
                )}
                <hr />
                <ul>
                  {this.state.collaborators.map((collab) => (
                    <li key={collab._id}> {collab.username} </li>
                  ))}
                </ul>


                <button onClick={this.deleteTask} className="btn-outline">
                  <TrashFill />
                </button>

                <button onClick={this.toggleEditForm} className="btn-logout">
                  Edit Task
                </button>

              </Col>
              <Col style={{ backgroundColor: "#f4f5f6", height: "90vh" }}>
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
