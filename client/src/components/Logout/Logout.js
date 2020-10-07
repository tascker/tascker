import React from "react";
import { Link } from "react-router-dom";
import { logout } from "../../services/auth";
import { Button } from "react-bootstrap";

export default function Logout(props) {
  const logoutHandler = (props) => {
    logout().then(() => {
      props.clearUser(null);
    });
  };

  return (
    <Button to="/" onClick={() => logoutHandler(props)}>
      Logout
    </Button>
  );
}
