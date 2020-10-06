import React, { Component } from "react";

export default class EditTask extends Component {
  render() {
    return (
      <div>
        <h2>Edit the task</h2>
        <form onSubmit={this.props.handleSubmit}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            value={this.props.title}
            onChange={this.props.handleChange}
          />

          <label htmlFor="notes">Notes</label>
          <input
            type="text"
            name="notes"
            value={this.props.notes}
            onChange={this.props.handleChange}
          />

          <label htmlFor="deadline">Deadline</label>
          <input
            type="date"
            name="deadline"
            value={this.props.deadline}
            onChange={this.props.handleChange}
          />

          <select
            name="status"
            id="status"
            onChange={this.props.handleChange}
            defaultValue={this.props.status}
          >
            {/* {Object.keys(this.props.status).map((key) => {
              return (
                <option
                  value={JSON.stringify({ id: key, name: datas[key].name })}
                  key={this.props.name}
                >
                  {data[key].name}
                </option>
              );
            })} */}
          </select>

          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}
