import React, { Component } from "react";

export default class OwnerForm extends Component {
    state = {
        owner: ""
    };
    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] =
            evt.target.value;
        this.setState(stateToChange);
    };
    constructNewOwner = evt => {
        evt.preventDefault();
        if (this.state.owner === "") {
            window.alert("Please enter the owner name");
        } else {
            const owner = {
                name: this.state.ownerName
            };
            this.props
                .addOwner(owner)
                .then(() => this.props.history.push("/owners"));
        }
    };
    render() {
        return (
            <React.Fragment>
                <form className="ownerForm">
                    <div className="form-group">
                        <label htmlFor="ownerName">Owner name</label>
                        <input
                            type="text"
                            required
                            className="form-control"
                            onChange={this.handleFieldChange}
                            id="ownerName"
                            placeholder="Owner name"
                        />
                    </div>
                    <button
                        type="submit"
                        onClick={this.constructNewOwner}
                        className="btn btn-primary"
                    >
                        Submit
                    </button>
                </form>
            </React.Fragment>
        );
    }
}