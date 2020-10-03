import React, { Component } from "react";
import Select from "react-select";

export default class DeptSelect extends Component {
  handleChange = (event) => {
    console.log(event.name);
    this.props.setQuery(event.name);
  };

  render() {
    return (
      <div>
        <Select
          onChange={this.handleChange}
          options={this.props.options}
        ></Select>
      </div>
    );
  }
}
