import React, { Component } from "react";
import Select from "react-select";

export default class DepartmentSelect extends Component {
  state = {
    options: [
      { name: "Business Operations", label: "Business Operations" },
      { name: "HR", label: "HR" },
      { name: "Marketing & Sales", label: "Marketing & Sales" },
      { name: "Finance", label: "Finance" },
      { name: "IT", label: "IT" },
      { name: "Software", label: "Software" },
    ],
  };

  handleChange = (event) => {
    console.log(event.target);
    // const { name, value } = event.target;

    // this.setState({
    //   [name]: value
    //   })
  };

  render() {
    return (
      <div>
        <Select
          options={this.state.options}
          name="department"
          id="department"
          onChange={this.handleChange}
        ></Select>
      </div>
    );
  }
}
