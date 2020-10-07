import React from "react";
import axios from "axios";
import { Form } from "react-bootstrap";

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
    // console.log("selected", value)
    this.props.setQuery(value);
  };

  render() {
    return (
      <>
        <Form.Control
          as="select"
          htmlSize={5}
          custom
          name="collaborators"
          id="collaborators"
          multiple={true}
          key={this.state.usersList._id}
          onChange={this.selectHandler}
        >
          {this.state.usersList.map((user) => {
            return <option value={user._id}>{user.username}</option>;
          })}
        </Form.Control>
      </>
    );
  }
}
