import React from 'react'
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const containerStyle = {
  height: '94.2vh',
};

const center = {
  lat: -3.745,
  lng: -38.523
};

function MapContainer() {
  return (
    <LoadScript
      googleMapsApiKey="AIzaSyB9zu0JV9YNb-O3RAIQ4rzXWTMEf44OdF0"
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        <></>
      </GoogleMap>
    </LoadScript>
  )
}

export default React.memo(MapContainer)