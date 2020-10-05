import React, { Component } from 'react'

export default class EditTask extends Component {
    render() {
        return (
            <div>
                <h2>Edit the task</h2>
                <form onSubmit={this.props.handleSubmit}></form>
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

                {/* <label htmlFor="collaborators">Collaborators</label>
                <CollabSelect
                    setQuery={this.setQuery}
                />             */}

                <select>
                    <option value="to-do">To-do</option>
                    <option value="on going">Ongoing</option>
                    {/* <option selected value="this.props.status">{this.props.status}</option> */}
                    <option value="done">Done</option>
                </select>
                <button type='submit'>Submit</button>

            </div>
        )
    }
}
