import './App.css';
import './map.js';
import MapContainer from './map.js';
function App() {
  return (
    <div className="map">
      <MapContainer />
      <div className="left-overlay">
        <p className="opaque-text">Left Overlay</p>
        </div>
    </div>
  );
}

export default App;
