import React from "react";
import Visualizer from "../src/components/Visualizer";
import Visualizer2 from "../src/components/Visualizer2";
import { Container, Row, Col } from "reactstrap";

function App() {
  return (
    <Container>
      <Row>
        <Col>
          <Visualizer2 />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
