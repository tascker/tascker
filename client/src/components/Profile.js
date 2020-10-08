import React, { Component } from 'react'

export default class Profile extends Component {
    state = {
        profileData: []
    }

    getUserDataFromDB = () => {
        axios.get("/api/user/$user._id")
            .then(res => {
                console.log("in profile", res)
                // const profiledata = res.data
            })
    }
    render() {
        return (
            <div>

            </div>
        )
    }
}
