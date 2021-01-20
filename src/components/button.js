import React from 'react';
import {Button  } from '@material-ui/core';

function customButton(props){
    return (
      <Button
        id={props.id}
        variant="contained"
        color="primary"
        className={props.class}
        startIcon={props.icon}
      >
        {props.text}
      </Button>
    );
}

export default customButton;