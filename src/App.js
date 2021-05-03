import './App.scss';
import { ReactComponent as CaretIcon } from './icons/caret.svg';

import React, { useReducer } from 'react';

import Navbar from './components/Navbar/Navbar';
import NavItem from './components/Navbar/NavItem';
import DropdownMenu from './components/Navbar/DropdownMenu/DropdownMenu';
import MapContainer from './components/Map/map';

export const AddressContext = React.createContext();

const initialState = {
  source: "",
  destination: ""
}

const reducer = (state, action) => {
  switch(action.type) {
      case 'planTrip':
        return action.payload;
      default:
          return state;
  }
}

function App() {
  const [addresses, dispatch] = useReducer(reducer, initialState);
  return (
    <AddressContext.Provider value={{addresses: addresses, addressDispatch: dispatch}}>
      <div>
        <Navbar>
          <NavItem icon={<CaretIcon />}>
            <DropdownMenu ></DropdownMenu>
          </NavItem>
        </Navbar>
        <MapContainer/>
      </div>
    </AddressContext.Provider>
    
  );
}

export default App;