import { Route } from 'react-router-dom'
import React, { Component } from "react"
import AnimalList from './animal/AnimalList';
import AnimalDetail from './animal/AnimalDetail';
import AnimalForm from './animal/AnimalForm';
import LocationList from './location/LocationList';
import EmployeeList from './employee/EmployeeList';
import EmployeeDetail from './employee/EmployeeDetail';
import EmployeeForm from './employee/EmployeeForm';
import OwnersList from './owners/OwnersList';
import OwnerDetail from './owners/OwnerDetail';
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
    addEmployee = employee =>
  employeeAPIManager.postEmployee(employee)
    .then(() => employeeAPIManager.getAllEmployees())
    .then(employees =>
      this.setState({
        employees: employees
      })
    )
    deleteEmployee = id => {
        return employeeAPIManager.deleteEmployee(id)
            .then(employeeAPIManager.getAllEmployees)
            .then(employees => this.setState({
                employees: employees
            }))
    }
    deleteOwner = id => {
        return ownerAPIManager.deleteOwner(id)
            .then(ownerAPIManager.getAllOwners)
            .then(owners => this.setState({
                owners: owners
            }))
    }
    addAnimal = animal =>
        animalAPIManager.postAnimal(animal)
            .then(() => animalAPIManager.getAllAnimals())
            .then(animals =>
                this.setState({
                    animals: animals
                })
            );
    deleteAnimal = id => {
        return animalAPIManager.deleteAnimal(id)
            .then(animalAPIManager.getAllAnimals)
            .then(animals => this.setState({
                animals: animals
            })
            )
    }

    componentDidMount() {
        const newState = {};
        employeeAPIManager.getAllEmployees()
            .then(parsedEmployees => {
                newState.employees = parsedEmployees;
                return fetch("http://localhost:5002/locations")
            }).then(locations => locations.json())
            .then(parsedLocations => {
                newState.locations = parsedLocations;
            })
            .then(ownerAPIManager.getAllOwners)
            .then(parsedOwners => {
                newState.owners = parsedOwners;
            })
            .then(animalAPIManager.getAllAnimals)
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
                <Route exact path="/animals" render={(props) => {
                    return <AnimalList {...props}
                        deleteAnimal={this.deleteAnimal}
                        animals={this.state.animals} />
                }} />
                <Route path="/animals/new" render={(props) => {
                    return <AnimalForm {...props}
                        addAnimal={this.addAnimal}
                        employees={this.state.employees} />
                }} />
                <Route path="/animals/:animalId(\d+)" render={(props) => {
                    return <AnimalDetail {...props} deleteAnimal={this.deleteAnimal} animals={this.state.animals} />
                }} />
                <Route exact path="/employees" render={(props) => {
                    return <EmployeeList {...props}
                    deleteEmployee={this.deleteEmployee}
                    employees={this.state.employees} />
                }} />
                <Route path="/employees/new" render={(props) => {
                    return <EmployeeForm {...props}
                        addEmployee={this.addEmployee}
                        locations={this.state.locations} />
                }} />
                <Route path="/employees/:employeeId(\d+)" render={(props) => {
                    return <EmployeeDetail {...props} deleteEmployee={this.deleteEmployee} employees={this.state.employees} />
                }} />
                <Route exact path="/owners" render={(props) => {
                    return <OwnersList owners={this.state.owners} />
                }} />
                <Route path="/owners/:ownerId(\d+)" render={(props) => {
                    return <OwnerDetail {...props} deleteOwner={this.deleteOwner} owners={this.state.owners} />
                }} />
            </div>
        )
    }
}

export default ApplicationViews