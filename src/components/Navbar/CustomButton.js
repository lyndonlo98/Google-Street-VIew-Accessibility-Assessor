import React, { useContext } from 'react';
import { AddressContext } from '../../App';

const CustomButton = ({ id, icon, text, source, destination }) => {
  const { addresses, addressDispatch } = useContext(AddressContext);

  return (
    <button
      className="plan-trip-button"
      onClick={() => addressDispatch({ type: "planTrip", payload: { source, destination } })}>
      <span>{text}</span>
    </button>
  );
}

export default CustomButton;