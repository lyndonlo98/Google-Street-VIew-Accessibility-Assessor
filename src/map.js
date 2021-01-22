import React, { Component } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';


export class MapContainer extends Component {
  render() {
    return (
      <Map
        google={this.props.google}
        zoom={14}
        initialCenter={
          {
            lat: 45.4215,
            lng: -75.6972
          }
        }
      />
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDmchELpMWZ6W-R8_OcvTBAA6cFyscvLpE'
})(MapContainer);