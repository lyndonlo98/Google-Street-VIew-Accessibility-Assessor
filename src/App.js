import './App.css';
import { ReactComponent as CaretIcon } from './icons/caret.svg';

import React from 'react';

import Navbar from './components/Navbar/Navbar';
import NavItem from './components/Navbar/NavItem';
import DropdownMenu from './components/Navbar/DropdownMenu/DropdownMenu';
import MapContainer from './components/Map/map';

function App() {
  return (
    <div>
      <Navbar>
        <NavItem icon={<CaretIcon />}>
          <DropdownMenu></DropdownMenu>
        </NavItem>
      </Navbar>
      <MapContainer/>
    </div>
    
  );
}

export default App;