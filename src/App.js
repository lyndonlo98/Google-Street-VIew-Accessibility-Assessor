import "./App.css";
import "./map.js";
import React from 'react';

import {makeStyles, IconButton, Button, Box  } from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import SearchIcon from '@material-ui/icons/Search';
import SettingsIcon from '@material-ui/icons/Settings';
import { useState } from 'react';
import MapContainer from "./map.js";
import { lightGreen } from "@material-ui/core/colors";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import CustomButton from './components/button';
import MiniSearchBar from './components/miniSearchBar';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    marginLeft: '20px',
    width: 320,
  },
  miniSearchBar: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    marginTop: '10px',
    marginLeft: '20px',
    width: 200,
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
    marginTop: "2px",
    marginLeft: "20px",
    width:327,
  },
  button: {
    margin: theme.spacing(1),
    color: lightGreen,
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
        id={isHidden ? "showOverlayButton" : "showOverlayButtonHidden"}
        endIcon={<ArrowForwardIosIcon />}
        onClick={() => {
          setVisibility(!isHidden);
        }}
      >
        View Accessibility
      </Button>

      <Box id={isHidden ? "hiddenLeftOverlay" : "leftOverlay"}>
        <IconButton
          id="hideOverlayButton"
          onClick={() => {
            setVisibility(!isHidden);
          }}
        >
          <ArrowBackIosIcon id="backArrowIcon" />
        </IconButton>

        <MiniSearchBar
          paperClass={classes.miniSearchBar}
          inputClass={classes.input}
          placeholder="Start Location"
          iconClass={classes.iconButton}
          icon={<SearchIcon />}
        />

        <MiniSearchBar
          paperClass={classes.miniSearchBar}
          inputClass={classes.input}
          placeholder="Destination"
          iconClass={classes.iconButton}
          icon={<SearchIcon />}
        />

        <CustomButton
          icon={<SettingsIcon />}
          id="settingsButton"
          class={classes.button}
          text="Settings"
        />

        <CustomButton
          icon={<ExitToAppIcon />}
          id="signInButton"
          class={classes.button}
          text="Sign in"
        />
      </Box>
    </Box>
  );
}

export default App;
