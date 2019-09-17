import React from "react";
import Visualizer from "../src/components/Visualizer";
import { Container, Row, Col } from "reactstrap";

function App() {
  return (
    <Container>
      <Row>
        <Col>
          <Visualizer />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
