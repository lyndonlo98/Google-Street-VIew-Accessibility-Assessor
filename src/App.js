import "./App.css";
import "./map.js";
import React from 'react';

import {makeStyles, Paper, IconButton, InputBase, Button, Box, BottomNavigation, BottomNavigationAction  } from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import EditIcon from '@material-ui/icons/Edit';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';
import { useState } from 'react';
import MapContainer from "./map.js";


const useStyles = makeStyles((theme) => ({
  root: {
    visibility: "Hidden",
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 320,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
  bottomNavigation: {
    marginTop: "5px",
    width:325,
  },
}));

function App() {

  const [isHidden, setVisibility] = useState(true);

  const classes = useStyles();
  return (
    <Box>
      <MapContainer />

      <Button 
        variant="contained"
        color="primary"
        id={isHidden? "showOverlayButton":"showOverlayButtonHidden"}
        endIcon={<ArrowForwardIosIcon/>}
        onClick={() => {setVisibility(!isHidden)}}
        >
          View Accessibility
      </Button>


      <Box
        id = {isHidden? "hiddenLeftOverlay": "leftOverlay" }>
      <IconButton
        id="hideOverlayButton"
        onClick={() => {setVisibility(!isHidden)}}>
      <ArrowBackIosIcon
        id="backArrowIcon"/>
      </IconButton>

      <Paper component="form" className={classes.root}>
      <IconButton className={classes.iconButton} aria-label="menu">
        <MenuIcon />
      </IconButton>
      <InputBase
        className={classes.input}
        placeholder="View Accessibility in an Area"
        inputProps={{ 'aria-label': 'View accessibility in an area' }}
      />
      <IconButton type="submit" className={classes.iconButton} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>


        <BottomNavigation
          className={classes.bottomNavigation}
          showLabels>
          <BottomNavigationAction label="Plan a route" icon={<EditIcon />} />
          <BottomNavigationAction label="Get directions" icon={<DirectionsIcon />} />
        </BottomNavigation>
      </Box>
    </Box>
    
  );
}

export default App;
