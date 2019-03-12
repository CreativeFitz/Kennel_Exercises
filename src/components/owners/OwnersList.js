import React, {Component} from 'react';
import { Link } from "react-router-dom";


class Ownerslist extends Component {
    render () {
        return (
            <section className="owners">
            {
                this.props.owners.map(owner =>
                    <div key={owner.id} className ="card">
                    <div className="card-body">
                    <h5 className="card-title">
                    {owner.name}
                    <Link className="nav-link" to={`/owners/${owner.id}`}>Details</Link>
                    </h5>
                    </div>
                    </div>)
            }
            </section>
        )
    }
}


export default Ownerslist