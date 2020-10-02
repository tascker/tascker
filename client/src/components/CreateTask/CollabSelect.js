import React from "react";
import axios from "axios";

export default class CollabSelect extends React.Component {
  state = {
    usersList: [],
  };

  collaborators = [];

  getUsersFromDB = () => {
    axios.get("/api/user").then((response) => {
      //console.log("response", response.data[0].username);
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
    // console.log("event", event.target.options.selectedIndex);

    const indexNumber = event.target.options.selectedIndex;
    const selectEvent = event.target.options;

    console.log(this.state.usersList[indexNumber]._id);

    this.setState({
      collaborators: this.collaborators.push(
        this.state.usersList[indexNumber]._id
      ),
    });
  };

  render() {
    return (
      <>
        <select
          name="collaboratos"
          id="collaborators"
          multiple
          key={this.state.usersList._id}
          onChange={this.selectHandler}
        >
          {this.state.usersList.map((user) => {
            return <option value={user.username}>{user.username}</option>;
          })}
        </select>
      </>
    );
  }
}
