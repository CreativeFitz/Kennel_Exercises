import React, {Component} from 'react';
import Ownerslist from '../owners/OwnersList';

class EmployeeList extends Component {
    render() {
        return (
            <section className="employees">
            {
                this.props.employees.map(employee =>
                    <div key={employee.id} className ="card">
                    <div className="card-body">
                    <h5 className="card-title">
                    {employee.name}
                    <button onClick={() => this.props.deleteEmployee(employee.id)}>Delete</button>
                    </h5>
                    </div>
                    </div>
                    )
            }
            </section>

        )
    }
}

export default EmployeeList;