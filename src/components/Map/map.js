import React, { useContext } from 'react'
import { GoogleMap, LoadScript, DirectionsService } from '@react-google-maps/api';

import { AddressContext } from '../../App';

const containerStyle = {
  height: '93.9vh',
};

const mapZoom = 15;

const center = {
  lat: 45.4197217,
  lng: -75.707717
};

const directionsRequest = {
  origin: '279 Laurier Ave W Suite 100, Ottawa, ON K1P 5J9',
  destination: '267 Bank St, Ottawa, ON K2P 2L6',
  provideRouteAlternatives: false,
  travelMode: 'WALKING'
}

function MapContainer() {
  const { addresses, addressDispatch } = useContext(AddressContext);
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
        <></>
      </GoogleMap>
    </LoadScript>
  )
}

export default React.memo(MapContainer)