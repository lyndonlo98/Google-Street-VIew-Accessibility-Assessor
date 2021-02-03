import React, { useContext } from 'react'
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import Route from './../Routes/route';

const containerStyle = {
  height: '93.9vh',
};

const mapZoom = 15;

const center = {
  lat: 45.4197217,
  lng: -75.707717
};


function MapContainer() {
  return (
    <LoadScript
      googleMapsApiKey={`${process.env.REACT_APP_GOOGLE_API_KEY}`}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={mapZoom}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        <Route/>
      </GoogleMap>
    </LoadScript>
  )
}

export default React.memo(MapContainer)