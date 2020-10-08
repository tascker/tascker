import React from "react";
import { Link } from "react-router-dom";
import { Button, Col } from "react-bootstrap";
import { logout } from "../../services/auth";

import logo from "../../img/logo1.png";

export default function Sidebar(props) {
  return (
    <Col
      xs={2}
      md={2}
      style={{
        backgroundColor: "#3D1B8B",
        height: "100vh",
        display: "flex",
        flexDirection: "column-reverse",
        alignItems: "center",
        paddingBottom: "5vh",
      }}
    >
      <Link to="/dashboard" className="nav">
        <Button>Dashboard</Button>
      </Link>
      <Link to="/create-task">
        <Button>Add a new Task</Button>
      </Link>
    </Col>
  );
}
