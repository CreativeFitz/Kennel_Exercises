import React, {Component} from 'react';

class LocationList extends Component {
    render() {
        return (
            <article>
                <h1>Location List</h1>
               {this.props.locations.map(singleLocation => {
                   return <p key={singleLocation.id}>{singleLocation.name}
                   {singleLocation.address}</p>
               })}
            </article>
        );
    }
}

export default LocationList;