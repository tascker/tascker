import React, { Component } from "react";

export default class Seacrh extends Component {
  state = {
    search: "",
  };

  submitHandlder = (event) => {
    event.preventDefault();
  };

  searchHandler = (event) => {
    console.log(event.target.value);
  };

  render() {
    return (
      <form onSubmit={this.submitHandlder}>
        <input
          type="text"
          name="search"
          id="search"
          value={this.state.search}
          onChange={this.searchHandler}
          placeholder="Search..."
        />
      </form>
    );
  }
}
