import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer, Circle } from '@react-google-maps/api';
import { AddressContext } from '../../App';
import { CustomDialog } from 'react-st-modal';
import AccessibilitySummaryDialog from '../AccessibilitySummaryDialog/AccessibilitySummaryDialog';
import { SquareFootRounded } from '@material-ui/icons';

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

function getDistance(point1, point2) {

  const a = (point2.lat() - point1.lat());
  const b = (point1.lng() -point2.lng());
  
  return Math.sqrt(a*a + b*b)
}

function MapContainer() {
  const [response, setResponse] = useState(null);
  const [waypoints, setWaypoints] = useState([]);
  const { addresses } = useContext(AddressContext);

  useEffect(() => {
  }, [addresses]);

  const directionsCallback = useCallback((res) => {
    if (res && res?.status === "OK") {
      let newWaypoints = [];
      const totalWaypoints = res.routes[0].overview_path;
      console.log(totalWaypoints);

      newWaypoints.push(totalWaypoints[0]);
      
      for (let i = 1; i < totalWaypoints.length; i++) {
        if(getDistance(newWaypoints[newWaypoints.length-1], totalWaypoints[i]) > 0.0007) {
          newWaypoints.push(totalWaypoints[i]);
        }
      }
      console.log(newWaypoints)
      setWaypoints(newWaypoints);
      setResponse(res);
      return;
    }
  }, [addresses]);

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
            addresses.source || "1125 Colonel By Dr, Ottawa, ON K1S 5B6, Canada",
            addresses.destination || "464 Rideau St, Ottawa, ON K1N 5Z3, Canada"
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

        {response && waypoints.map((latlng, idx) => {
          return (<Circle
            key={idx}
            center={{
              lat: latlng.lat(),
              lng: latlng.lng()
            }}
            radius={20}
            onClick={async () => {
              const result = await CustomDialog(
                <AccessibilitySummaryDialog
                  lat={latlng.lat()}
                  lng={latlng.lng()}
                />,
                {
                  title: 'Accessibility Summary',
                  showCloseIcon: true,
                  className: 'dialog'
                }
              );
            }}
            options={{
              strokeColor: '#e8953c',
              strokeOpacity: 0.8,
              strokeWeight: 2,
              fillColor: '#e8953c',
              fillOpacity: 0.35}}
          />)
        })}
      </GoogleMap>
    </LoadScript>
  );
}

export default React.memo(MapContainer)