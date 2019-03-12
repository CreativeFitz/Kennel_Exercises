import React, { Component } from "react";


export default class AnimalForm extends Component {
  // Set initial state
  state = {
    employeeName: "",
    locationId: ""
  };

  // Update state whenever an input field is edited
  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

  /*
        Local method for validation, creating animal object, and
        invoking the function reference passed from parent component
     */
  constructNewEmployee = evt => {
    evt.preventDefault();
    if (this.state.location === "") {
      window.alert("Please select a location");
    } else {
      const employee = {
        name: this.state.employeeName,
        // Make sure the employeeId is saved to the database as a number since it is a foreign key.
        locationId: parseInt(this.state.locationId)
      };

      // Create the animal and redirect user to animal list
      this.props
        .addEmployee(employee)
        .then(() => this.props.history.push("/employees"));
    }
  };

  render() {
    return (
      <React.Fragment>
        <form className="employeeForm">
          <div className="form-group">
            <label htmlFor="employeeName">Employee name</label>
            <input
              type="text"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="employeeName"
              placeholder="Employee name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="location">Assign to location</label>
            <select
              defaultValue=""
              name="location"
              id="locationId"
              onChange={this.handleFieldChange}
            >
              <option value="">Select a location</option>
              {this.props.locations.map(e => (
                <option key={e.id} id={e.id} value={e.id}>
                  {e.name}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            onClick={this.constructNewEmployee}
            className="btn btn-primary"
          >
            Submit
          </button>
        </form>
      </React.Fragment>
    );
  }
}