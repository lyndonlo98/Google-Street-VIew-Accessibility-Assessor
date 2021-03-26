import React, { useState, useEffect, useRef, useContext } from "react";

import CustomButton from '../Navbar/CustomButton';

import { AddressContext } from '../../App';

let sourceAutoComplete;
let destinationAutoComplete;

const loadScript = (url, callback) => {
  let script = document.createElement("script");
  script.type = "text/javascript";

  if (script.readyState) {
    script.onreadystatechange = function() {
      if (script.readyState === "loaded" || script.readyState === "complete") {
        script.onreadystatechange = null;
        callback();
      }
    };
  } else {
    script.onload = () => callback();
  }

  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);
};

function handleScriptLoad(updateAddress, updateSource, updateDestination, sourceRef, destinationRef) {
  sourceAutoComplete = new window.google.maps.places.Autocomplete(
    sourceRef.current,
    { }
  );
  destinationAutoComplete = new window.google.maps.places.Autocomplete(
    destinationRef.current,
    { }
  );
  sourceAutoComplete.setFields(["address_components", "formatted_address"]);
  sourceAutoComplete.addListener("place_changed", () =>
    handlePlaceSelect(updateAddress, updateSource, 'source')
  );
  destinationAutoComplete.setFields(["address_components", "formatted_address"]);
  destinationAutoComplete.addListener("place_changed", () =>
    handlePlaceSelect(updateAddress, updateDestination, 'destination')
  );
}

async function handlePlaceSelect(updateAddress, updateQuery, srcOrDest) {
  if (srcOrDest === 'source') {
    const addressObject = sourceAutoComplete.getPlace();
    const source = addressObject.formatted_address;
    updateAddress({type: "sourceChange", payload: source});
    updateQuery(source);
    console.table(addressObject);
  } else {
    const addressObject = destinationAutoComplete.getPlace();
    const dest = addressObject.formatted_address;
    updateAddress({type: "destinationChange", payload: dest});
    updateQuery(dest);
    console.log(addressObject);
  }
}

const SearchLocationInput = () => {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const sourceRef = useRef(null);
  const destinationRef = useRef(null);

  const { addresses, addressDispatch } = useContext(AddressContext);

  useEffect(() => {
    loadScript(
      `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&libraries=places`,
      () => handleScriptLoad(addressDispatch, setSource, setDestination, sourceRef, destinationRef)
    );
  }, []);

  return (
    <div>
      <div className="search-location-input">
        <input
          ref={sourceRef}
          onChange={event => {
            const payload = event.target.value;
            setSource(payload);
          }}
          placeholder={"Enter source"}
          value={source}
        />
      </div>
      <div className="search-location-input">
        <input
          ref={destinationRef}
          onChange={event => {
            const payload = event.target.value;
            setDestination(payload);
          }}
          placeholder={"Enter destination"}
          value={destination}
        />
      </div>
      <CustomButton
        text={"Plan Trip"}
      />
    </div>
  );
}

export default SearchLocationInput;