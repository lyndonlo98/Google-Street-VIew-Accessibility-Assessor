import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';
import { AddressContext } from '../../App';

const containerStyle = {
  height: '93.9vh',
};

const mapZoom = 15;

const center = {
  lat: 45.4197217,
  lng: -75.707717
};

const directionsRequest = (start,end) => {
  return {
    origin: start,
    destination: end,
    provideRouteAlternatives: false,
    travelMode: "WALKING",
  };
}

function MapContainer() {
  const [response, setResponse] = useState(null);
  const { addresses } = useContext(AddressContext);

  console.log("rendderrr");

  useEffect(() => {  
  }, [addresses]);

  const directionsCallback = useCallback((res) => {
    console.log("in callback")
    console.log(res)
    if (!res) return;

    console.log('duhdudh');
    console.log(response); 
    console.log(addresses);
    console.log(res === response);
    if (response && res.request.destination.query === response.request.destination.query &&
      res.request.origin.query === response.request.origin.query) {
      console.log('we are returning')
      return;
    }

    res && res?.status === "OK" ? setResponse(res) : console.log(res.status);
  });

  return (
    <LoadScript
      googleMapsApiKey={`${process.env.REACT_APP_GOOGLE_API_KEY}`}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={mapZoom}
        onLoad={map => {
          console.log('DirectionsRenderer onLoad map: ', map)
        }}
      >
          <DirectionsService
            options={directionsRequest(addresses.source,addresses.destination)}
            callback={res => directionsCallback(res)}
            onLoad={directionsService => {
              console.log('DirectionsService onLoad directionsService: ', directionsService)
            }}
          />

        
          
          {
            // (response !== null) &&
            <DirectionsRenderer 
              options={response && {directions: response}}
              onLoad={directionsRenderer => {
                console.log('DirectionsRenderer onLoad directionsRenderer: ', directionsRenderer)
              }}
            />
          }
      </GoogleMap>
    </LoadScript>
  )
}

export default React.memo(MapContainer)