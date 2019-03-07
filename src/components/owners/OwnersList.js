import React, {Component} from 'react';


export default class Ownerslist extends Component {
    render () {
        return (
            <section className="owners">
            {
                this.props.owners.map(owner =>
                    <div key={owner.id} className ="card">
                    <div className="card-body">
                    <h5 className="card-title">
                    {owner.name}
                    <button onClick={() => this.props.deleteOwner(owner.id)}>Delete</button>
                    </h5>
                    </div>
                    </div>)
            }
            </section>
        )
    }
}
