import "./App.css";
import "./map.js";
import {
  Tabs,
  Tab,
  TabContainer,
  TabPane,
  TabContent,
  Row,
  Col,
  Nav,
} from "react-bootstrap";
import MapContainer from "./map.js";
function App() {
  return (
    <div className="map">
      <MapContainer />
      <div className="left-overlay">
        {/*SEARCH BAR*/}
        <input
          id="searchBar"
          key="random1"
          //value={keyword}
          placeholder={"View accessbility in an area"}
          // onChange={(e) => setKeyword(e.target.value)}
        />

        {/*TABS*/}
        <TabContainer id="left-tabs-example" defaultActiveKey="first">
          <Row>
            <Col sm={3}>
              <Nav variant="pills" className="flex-column">
                <Nav.Item>
                  <Nav.Link eventKey="first">Plan a route</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="second">Get directions</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={9}>
              <TabContent>
                <TabPane eventKey="first"></TabPane>
                <TabPane eventKey="second"></TabPane>
              </TabContent>
            </Col>
          </Row>
        </TabContainer>
      </div>
    </div>
  );
}

export default App;
