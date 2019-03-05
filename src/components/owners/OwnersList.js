import React, {Component} from 'react';

class Ownerslist extends Component {
    render () {
        return (
            <article>
                <h1>Owners List</h1>
                {this.props.owners.map(
                    (singleOwner => {
                        return <p key={singleOwner.id}>
                        {singleOwner.name} {singleOwner.phone}</p>
                    })
                )}
            </article>
        )
    }
}
export default Ownerslist;