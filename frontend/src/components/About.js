import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import Sidebar from './Sidebar.js';

import 'bootstrap/dist/css/bootstrap.css';

class About extends React.Component {
  render() {
    return (
      <Container>
        <br/>
        <br/>
        <Row>
          <Col>
            <section className="aboutSection">
              <h1 className="display-4">About Goddess Climbing</h1>
              <p className="lead">[Sample text]</p>
            </section>
            <hr/>
            <section className="aboutSection">
              <h1 className="display-4">Learn More About The Owner</h1>
              <p className="lead">[Sample text on how Grace is super cool]</p>
            </section>
          </Col>
          <Sidebar />
        </Row>
      </Container>
      );
  }
}

export default About;
