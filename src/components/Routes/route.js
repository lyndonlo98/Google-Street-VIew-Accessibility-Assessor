import React, { useState, useContext } from "react";
import {DirectionsService, DirectionsRenderer } from '@react-google-maps/api';
import { AddressContext } from '../../App';

const directionsRequest = (start,end)=> {

    return {
      origin: start,
      destination: end,
      provideRouteAlternatives: false,
      travelMode: "WALKING",
    };
    
  }

//   const callbackFunction = (response) => {
//     console.log(response);
//     if(response!=null){
//       if (response.status === "OK") {
//         //route was returned successfully
//         setResponse(response);
//       } else {
//         console.log(response.status);
//       }
//     }
// }
/*
function handleScriptLoad(response, setResponse){

}
*/
const Route = () => {
    const [response, setResponse] = useState("");
    const { addresses, addressDispatch } = useContext(AddressContext);
    console.log(addresses.destination);
    console.log(addresses.source);
    /*
    useEffect(() => {
          handleScriptLoad(setResponse);
      }, []);
*/
    return(
    <div>
        <DirectionsService
        options={directionsRequest(addresses.source,addresses.destination)}
        callback={(response) => {
            console.log(response);
            if(response!=null){
              if (response.status === "OK") {
                //route was returned successfully
                setResponse(response);
              } else {
                console.log(response.status);
              }
            }
        }}/>

        <DirectionsRenderer 
        options={{directions: response}}/>
    </div>
    )
}

export default Route;
