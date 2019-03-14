import { Route, Redirect } from 'react-router-dom'
import React, { Component } from "react"
import Login from './authentication/login'
import AnimalList from './animal/AnimalList';
import AnimalDetail from './animal/AnimalDetail';
import AnimalForm from './animal/AnimalForm';
import AnimalEditForm from './animal/AnimalEditForm';
import LocationList from './location/LocationList';
import EmployeeList from './employee/EmployeeList';
import EmployeeDetail from './employee/EmployeeDetail';
import EmployeeForm from './employee/EmployeeForm';
import OwnersList from './owners/OwnersList';
import OwnerDetail from './owners/OwnerDetail';
import OwnerForm from './owners/OwnerForm';
import animalAPIManager from '../modules/AnimalManager';
import ownerAPIManager from '../modules/OwnerManager';
import employeeAPIManager from '../modules/EmployeeManager';



class ApplicationViews extends Component {

    isAuthenticated = () => sessionStorage.getItem("credentials") !== null || localStorage.getItem("credentials") !== null;

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
    updateAnimal = (editedAnimalObject) => {
        return animalAPIManager.put(editedAnimalObject)
            .then(() => animalAPIManager.getAllAnimals())
            .then(animals => {
                this.setState({
                    animals: animals
                })
            });
    };

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
                <Route path="/login" component={Login} />
                <Route exact path="/" render={props => {
                    return this.isAuthenticated() ? (
                        <LocationList {...props}
                            locations={this.state.locations} />
                    ) : (
                            <Redirect to="/login" />
                        );
                }} />
                <Route exact path="/animals" render={props => {
                    return this.isAuthenticated() ? (
                        <AnimalList {...props}
                            animals={this.state.animals} />
                    ) : (
                            <Redirect to="/login" />
                        );
                }} />
                <Route
                    path="/animals/new"
                    render={props => {
                        return this.isAuthenticated() ? (
                            <AnimalForm
                                {...props}
                                addAnimal={this.addAnimal}
                                employees={this.state.employees}
                            />
                        ) : (
                                <Redirect to="/login" />
                            );
                    }}
                />
                <Route
                    path="/animals/:animalId(\d+)"
                    render={props => {
                        return this.isAuthenticated() ? (
                            <AnimalDetail
                                {...props}
                                deleteAnimal={this.deleteAnimal}
                                animals={this.state.animals}
                            />
                        ) : (
                                <Redirect to="/login" />
                            );
                    }}
                />
                <Route
                    path="/animals/:animalId(\d+)/edit" render={props => {
                        return <AnimalEditForm {...props} employees={this.state.employees} updateAnimal={this.updateAnimal} />
                    }}
                />
                <Route exact path="/employees" render={props => {
                    return this.isAuthenticated() ? (
                        <EmployeeList {...props}
                            employees={this.state.employees} animals={this.state.animals}
                            deleteEmployees={this.state.employees} />
                    ) : (
                            <Redirect to="/login" />
                        );
                }} />
                <Route
                    path="/employees/new"
                    render={props => {
                        return this.isAuthenticated() ? (
                            <EmployeeForm
                                {...props}
                                addEmployee={this.addEmployee}
                                locations={this.state.locations}
                            />
                        ) : (
                                <Redirect to="/login" />
                            );
                    }}
                />
                <Route
                    path="/employees/:employeeId(\d+)"
                    render={props => {
                        return this.isAuthenticated() ? (
                            <EmployeeDetail
                                {...props}
                                deleteEmployee={this.deleteEmployee}
                                employees={this.state.employees}
                            />
                        ) : (
                                <Redirect to="/login" />
                            );
                    }}
                />
                 <Route exact path="/owners" render={props => {
                    return this.isAuthenticated() ? (
                        <OwnersList {...props}
                            owners={this.state.owners}
                             />
                    ) : (
                            <Redirect to="/login" />
                        );
                }} />
                <Route
                    path="/owners/:ownerId(\d+)"
                    render={props => {
                        return this.isAuthenticated() ? (
                            <OwnerDetail
                                {...props}
                                deleteOwner={this.deleteOwner}
                                owners={this.state.owners}
                            />
                        ) : (
                                <Redirect to="/login" />
                            );
                    }}
                />
                <Route
                    path="/owners/new"
                    render={props => {
                        return this.isAuthenticated() ? (
                            <OwnerForm
                                {...props}
                                addOwner={this.addOwner}
                            />
                        ) : (
                                <Redirect to="/login" />
                            );
                    }}
                />
            </div>
        )
    }
}

export default ApplicationViews