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
    provideRouteAlternatives: true,
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

    /**
     * CHANGES TO RETREIEVE THE POINTS WHERE WE WILL SHOW THE BUBBLE HEADS
     */
    console.log(res.routes[0].overview_path);
    var intersections=[];
    var pathCheckpoints=[];

    res.routes[0].legs[0].steps.map((step) =>
      intersections = [...intersections, [step.start_point.lat(),step.start_point.lng()]]
    )
    console.log(intersections);

    res.routes[0].overview_path.map((point) =>
    pathCheckpoints = [...pathCheckpoints, [point.lat(),point.lng()]]
  )
  console.log(pathCheckpoints);
    //_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-

    
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
    <LoadScript googleMapsApiKey={`${process.env.REACT_APP_GOOGLE_API_KEY}`}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={mapZoom}
        onLoad={(map) => {
          console.log("DirectionsRenderer onLoad map: ", map);
        }}
      >
        <DirectionsService
          options={directionsRequest(
            addresses.source === ""
              ? "1125 Colonel By Dr, Ottawa, ON K1S 5B6, Canada"
              : addresses.source,
            addresses.destination === ""
              ? "464 Rideau St, Ottawa, ON K1N 5Z3, Canada"
              : addresses.destination
          )}
          callback={(res) => directionsCallback(res)}
          onLoad={(directionsService) => {
            console.log(
              "DirectionsService onLoad directionsService: ",
              directionsService
            );
          }}
        />

        {
          // (response !== null) &&
          <DirectionsRenderer
            options={response && { directions: response }}
            onLoad={(directionsRenderer) => {
              console.log(
                "DirectionsRenderer onLoad directionsRenderer: ",
                directionsRenderer
              );
            }}
          />
        }
      </GoogleMap>
    </LoadScript>
  );
}

export default React.memo(MapContainer)