import React from "react";
import { logout } from "../../services/auth";
import { Col, Button } from "react-bootstrap";

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
      }}
    >
      {props.user && <h3>Hello, {props.user.username} 👋🏼 </h3>}

      <Button to="/" onClick={() => logoutHandler(props)}>
        Logout
      </Button>
    </Col>
  );
}
