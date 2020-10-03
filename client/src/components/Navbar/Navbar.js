import React from "react";
import { Link } from "react-router-dom";
import { logout } from "../../services/auth";

export default function Navbar(props) {
  const logoutHandler = (props) => {
    logout().then(() => {
      props.setUser(null);
    });
  };

  return (
    <nav>
      {props.user && <span>Welcome {props.user.username} 👋🏼 </span>}
      <Link to="/" onClick={() => logoutHandler(props)}>
        Logout
      </Link>
    </nav>
  );
}
