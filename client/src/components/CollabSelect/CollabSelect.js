import React from "react";
import axios from "axios";

export default class CollabSelect extends React.Component {
  state = {
    usersList: [],
  };

  getUsersFromDB = () => {
    axios.get("/api/user").then((response) => {
      this.setState({
        usersList: response.data,
      });

      return response.data;
    });
  };

  componentDidMount() {
    this.getUsersFromDB();
  }

  selectHandler = (event) => {
    var options = event.target.options;
    var value = [];
    for (var i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    this.props.setQuery(value);
  };
  // <Link
  //               to={`/tasks/${task._id}`}
  //               style={{ textDecoration: "none" }}
  //             >
  //               {" "}
  //               {task.title}
  //             </Link>
  render() {
    return (
      <>
        <select
          name="collaborators"
          id="collaborators"
          multiple={true}
          key={this.state.usersList._id}
          onChange={this.selectHandler}
        >
          {this.state.usersList.map((user) => {
            return (
              // <Link to={`/users/${user._id`}>
              <option value={user._id}> {user.username}</option>
              // </Link>
            )
          })}
        </select>
      </>
    );
  }
}
