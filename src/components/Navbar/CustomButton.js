import React from 'react';

const CustomButton = ({id, icon, text}) => {
    return (
      <button className="plan-trip-button">
        <span>{text}</span>
      </button>
    );
}

export default CustomButton;