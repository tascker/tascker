import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";

export default class EditTask extends Component {
  render() {
    return (
      <>
        <h3>Edit the task</h3>
        <Form onSubmit={this.props.handleSubmit}>
          <Form.Label htmlFor="title">Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={this.props.title}
            onChange={this.props.handleChange}
          />

          <Form.Label htmlFor="notes">Notes</Form.Label>
          <Form.Control
            as="textarea"
            rows="3"
            type="text"
            name="notes"
            value={this.props.notes}
            onChange={this.props.handleChange}
          />

          <Form.Label htmlFor="deadline">Deadline</Form.Label>
          <Form.Control
            type="date"
            name="deadline"
            value={this.props.deadline}
            onChange={this.props.handleChange}
          />

          {/* <label htmlFor="collaborators">Collaborators</label>
                <CollabSelect
                    setQuery={this.setQuery}
                />             */}

          <Form.Label htmlFor="status">Status</Form.Label>
          <select>
            <option value="to-do">To-do</option>
            <option value="on going">Ongoing</option>
            {/* <option selected value="this.props.status">{this.props.status}</option> */}
            <option value="done">Done</option>
          </select>
          <Button type="submit">Submit</Button>
        </Form>
      </>
    );
  }
}
