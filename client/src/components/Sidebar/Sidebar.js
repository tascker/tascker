import React from "react";
import { Link } from "react-router-dom";
import { logout } from "../../services/auth";
// import { Cart } from "grommet-icons";
import logo from "../../img/logo1.png";

export default function Sidebar(props) {
  const logoutHandler = (props) => {
    logout().then(() => {
      props.clearUser(null);
    });
  };

  return (
    <ul className="sidebar">
      <li>
        <Link to="/dashboard" className="nav">
          <span role="img" aria-label="Home">
            🏠
          </span>
        </Link>
      </li>
      <li>{/* <Cart /> */}</li>
      <li>Users</li>
    </ul>
  );
}
