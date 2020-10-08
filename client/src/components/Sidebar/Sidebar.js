import React from "react";
import { Link } from "react-router-dom";
import { Button, Col } from "react-bootstrap";
import { logout } from "../../services/auth";
// import { Cart } from "grommet-icons";
import logo from "../../img/logo1.png";

export default function Sidebar(props) {
  return (
    <Col
      xs={1}
      md={1}
      style={{
        backgroundColor: "#3D1B8B",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1%",
      }}
    >
      <Link to="/dashboard" className="nav">
        <h4 style={{ color: "white", fontWeight: "bold" }}>tascker.</h4>
      </Link>
      {/* <Link to="/dashboard" className="nav">
        <Button>Dashboard</Button>
      </Link> */}
      <Link to="/create-task">
        <button className="btn-add">Add Task</button>
      </Link>
    </Col>
  );
}
