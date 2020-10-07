import React from "react";
import { Link } from "react-router-dom";
import { logout } from "../../services/auth";

import logo from "../../img/logo1.png";

export default function Sidebar(props) {
  const logoutHandler = (props) => {
    logout().then(() => {
      props.clearUser(null);
    });
  };

  return (
    <div className="sidebar">
      <Link to="/dashboard" className="nav">
        <span role="img" aria-label="Home">
          🏠
        </span>
      </Link>
    </div>
  );
}
