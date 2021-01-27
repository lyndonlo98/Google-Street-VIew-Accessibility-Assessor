import React, { useContext } from 'react'
import { GoogleMap, LoadScript } from '@react-google-maps/api';

import { AddressContext } from '../../App';

const containerStyle = {
  height: '93.9vh',
};

const center = {
  lat: 45.4197217,
  lng: -75.707717
};

function MapContainer() {
  const { addresses, addressDispatch } = useContext(AddressContext);
  return (
    <LoadScript
      googleMapsApiKey={`${process.env.REACT_APP_GOOGLE_API_KEY}`}
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