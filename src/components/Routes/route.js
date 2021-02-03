import React, { useState } from "react";
import {DirectionsService, DirectionsRenderer } from '@react-google-maps/api';

const directionsRequest = {
    origin: '279 Laurier Ave W Suite 100, Ottawa, ON K1P 5J9',
    destination: '267 Bank St, Ottawa, ON K2P 2L6',
    provideRouteAlternatives: false,
    travelMode: 'WALKING'
  }

  const callbackFunction = (response) => {
    console.log(response);
    if(response!=null){
      if (response.status === "OK") {
        //route was returned successfully
        setResponse(response);
      } else {
        console.log(response.status);
      }
    }
}

const Route = () => {
    const [response, setResponse] = useState("");

    return(
    <div>
        <DirectionsService
        options={directionsRequest}
        callback={callbackFunction}/>

        <DirectionsRenderer 
        options={{directions: response}}/>
    </div>
    )
}

export default Route;
