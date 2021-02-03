import React from 'react';
import { Button } from '@material-ui/core';

const CustomButton = ({id, icon, text}) => {
    return (
      // <Button
      //   style={{height: '40px'}}
      //   id={id}
      //   variant="contained"
      //   color="primary"
      //   startIcon={icon}
      // >
      //   {text}
      // </Button>
      <button className="plan-trip-button">
        <span>{text}</span>
      </button>
    );
}

export default CustomButton;