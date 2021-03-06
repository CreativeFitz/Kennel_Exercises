import React, {Component} from 'react';
import { Link } from "react-router-dom";
import dog from "./DogIcon.png"

export default class AnimalCard extends Component {
    render(){
        return( <div key={this.props.animal.id} className="card">
        <div className="card-body">
            <h5 className="card-title">
                <img src={dog} alt="Dog" className="icon--dog" />
                {this.props.animal.name}
                <Link className="nav-link" to={`/animals/${this.props.animal.id}`}>Details</Link>
            </h5>
        </div>
    </div>
)
    }
}