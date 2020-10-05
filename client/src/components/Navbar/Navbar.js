import React from "react";
import { Link } from "react-router-dom";
import { logout } from "../../services/auth";

import logo from "../../img/logo.png";

export default function Navbar(props) {
  const logoutHandler = (props) => {
    logout().then(() => {
      props.clearUser(null);
    });
  };

  return (
    <nav>
      {props.user && <span>Welcome {props.user.username} 👋🏼 </span>}
      {/* <Link className="navLogo" to="/">
        <img src={logo} style={{ height: 70 }} alt="tascker" />
      </Link> */}
      <Link to="/" className="nav">
        <span role="img" aria-label="Home">
          🏠
        </span>
      </Link>

      <div className="navPages">
        {props.user ? (
          <>
            <Link className="awesome-link" to="/dashboard">
              Dashboard
            </Link>

            {/* <Link
              className="awesome-link"
              to={`/user/${props.user._id}`}
              user={props.user}
            >
              Profile
            </Link> */}

            {/* <Link className="awesome-link" to="/dashboard">
              Tasks
            </Link> */}

            <Link
              className="awesome-link"
              to="/"
              onClick={() => logoutHandler(props)}
            >
              Logout
            </Link>
          </>
        ) : (
          <>
            <Link
              className="awesome-link"
              to={{
                pathname: "/signup",
                state: {
                  showForm: "signup",
                },
              }}
            >
              Signup
            </Link>

            <Link
              className="awesome-link"
              to={{
                pathname: "/login",
                state: {
                  showForm: "login",
                },
              }}
            >
              Login
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
