import React, { Component } from "react";
import axios from 'axios'
import Select from 'react-select'

export default class EditTask extends Component {
    state = {
        status: "",
        allStatus: [
            { name: "to-do", label: "to-do" },
            { name: "on going", label: "on going" },
            { name: "done", label: "done" }],
        usersList: [],
    }

    getOptions() {
        const res = this.state.allStatus

        const options = res.map(d => ({
            "value": d.name,
            "label": d.label
        }))
        this.setState({ status: options.value })

    }
    componentDidMount() {
        this.getOptions();
        this.getUsersFromDB();
    }

    getUsersFromDB = () => {
        axios.get("/api/user").then((response) => {
            //   console.log("user", response.data)
            const collabOptions = response.data.map(user => ({
                "value": user._id,
                "label": user.username
            }))
            //  console.log("collab", collabOptions)
            this.setState({
                usersList: collabOptions,
            });
            //   console.log(this.state.usersList)
        });
    };
    render() {
        console.log(this.props.status)
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

                    {/* <label htmlFor="collaborators">Collaborators</label>
                <CollabSelect
                    setQuery={this.setQuery}
                />             */}

                    <Select value={this.props.status} options={this.state.allStatus}
                        // {<option selected value="this.props.status">{this.props.status}</option>}
                        onChange={this.props.statusChange} />

                    <Select options={this.state.usersList} isMulti
                        onChange={this.props.collabChange} />
                    <button type='submit'>Submit</button>
                </form>

            </div>
        )
    }
}
