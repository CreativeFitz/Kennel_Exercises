import { Route } from 'react-router-dom'
import React, { Component } from "react"
import AnimalList from './animal/AnimalList'
import LocationList from './location/LocationList'
import EmployeeList from './employee/EmployeeList'
import OwnersList from './owners/OwnersList'
import animalAPIManager from '../modules/AnimalManager';
import ownerAPIManager from '../modules/OwnerManager';
import employeeAPIManager from '../modules/EmployeeManager';


class ApplicationViews extends Component {

    state = {
        employees: [],
        locations: [],
        animals: [],
        owners: []
    }
    deleteEmployee = id => {
        employeeAPIManager.deleteEmployee(id)
        .then (employeeAPIManager.getAllEmployees)
        .then(employees => this.setState({
            employees:employees
        }))
    }
    deleteOwner = id => {
       return ownerAPIManager.deleteOwner(id)
       .then (ownerAPIManager.getAllOwners)
        .then(owners => this.setState({
            owners: owners
        }))
    }
    deleteAnimal = id => {
        return animalAPIManager.deleteAnimal(id)
        .then (animalAPIManager.getAllAnimals)
        .then(animals => this.setState({
            animals: animals
        })
      )
    }

    componentDidMount(){
        const newState = {};
        employeeAPIManager.getAllEmployees()
        .then(parsedEmployees => {
            newState.employees = parsedEmployees;
            return fetch("http://localhost:5002/locations")
        }).then(locations => locations.json())
        .then(parsedLocations => {
            newState.locations = parsedLocations;
        })
        .then (ownerAPIManager.getAllOwners)
        .then(parsedOwners => {
            newState.owners = parsedOwners;
        })
        .then (animalAPIManager.getAllAnimals)
        .then(parsedAnimals => {
            newState.animals = parsedAnimals;
            this.setState(newState);
        })
    }

    render() {
        return (
           <div className="container-div">
                <Route exact path="/" render={(props) => {
                    return <LocationList locations={this.state.locations} />
                }} />
                <Route path="/animals" render={(props) => {
                    return <AnimalList deleteAnimal={this.deleteAnimal} animals={this.state.animals} />
                }} />
                <Route path="/employees" render={(props) => {
                    return <EmployeeList deleteEmployee={this.deleteEmployee} employees={this.state.employees} />
                }} />
                <Route path="/owners" render={(props) => {
                    return <OwnersList deleteOwner={this.deleteOwner} owners={this.state.owners} />
                }}/>
            </div>
        )
    }
}

export default ApplicationViews