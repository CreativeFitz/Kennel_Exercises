import React, {Component} from 'react';

class AnimalList extends Component {
    render() {
        return (
            <article>
                <h1>Animal List</h1>
                {this.props.animals.map(
                    (singleAnimal => {
                        return <p key= {singleAnimal.id}>
                        {singleAnimal.name}</p>
                    })
                )}
            </article>
        )
    }
}
export default AnimalList;