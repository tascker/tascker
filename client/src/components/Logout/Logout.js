import React from "react";
import { logout } from "../../services/auth";
import { Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Logout(props) {
  const logoutHandler = (props) => {
    logout().then(() => {
      props.clearUser(null);
    });
  };

  return (
    <Col
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: "10vh",
        borderBottom: "1px solid #d0d0d0",
      }}
    >
      {props.user && <h3>Hello, {props.user.username} 👋🏼 </h3>}

      <Link to="/">
        <button className="btn-logout" onClick={() => logoutHandler(props)}>
          Logout
        </button>
      </Link>
    </Col>
  );
}
