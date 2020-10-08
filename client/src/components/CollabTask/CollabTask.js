import React, { Component } from "react";
import axios from "axios";
// import { Link } from "react-router-dom";
import TaskList from "../TaskList/TaskList";

export default class CollabTask extends Component {
  state = {
    tasks: this.props.collabTasks,
    //  profileData: []
  };

  // componentDidMount() {
  //   this.getTasksFromDB();
  // }

  // getTasksFromDB = () => {
  //   const userId = this.props.user
  //   console.log("userId", userId)
  //   axios
  //     .get("/api/tasks")
  //     .then((response) => {

  //       const taskList = response.data
  //       let collabTasksArray = []
  //       for (let i = 0; i < taskList.length; i++) {
  //         if (taskList[i].collaborators.includes(userId._id) && !taskList[i].pinned)
  //           collabTasksArray.push(taskList[i])
  //       }
  //       this.setState({
  //         tasks: collabTasksArray,
  //       });
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };



  render() {
    return (
      <div>
        <TaskList tasks={this.props.collabTasks} search={this.props.search} pinned={this.props.pinned}
          changePinned={this.props.changePinned}
        />
      </div>

    );
  }
}
