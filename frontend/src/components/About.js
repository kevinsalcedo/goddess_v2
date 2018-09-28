import React from 'react';
import {Container, Row, Col, Card, CardImg} from 'reactstrap';
import about_grace from '../assets/About_Grace.jpg';

import 'bootstrap/dist/css/bootstrap.css';
import '../css/About.css';

class About extends React.Component {
  render() {
    return (<Container className="content-body">
      <Row>
        <Col xs="4">
          <Card className="face-card my-auto rounded-circle">
            <CardImg className="about_grace rounded-circle" src={about_grace} alt="About Grace"/>
          </Card>
        </Col>
        <Col className="my-auto">
          <h1 className="display-4">Learn More About The Owner</h1>
        </Col>
      </Row>
      <br/>
      <Row>
        <p className="lead">
My name is Grace Cline and I live in Austin,Texas. I started climbing around the age of 15 and fell in love immediately with the sport. Because of the way that climbing helped me develop a strong mind-body connection, it was influential in my recovery from an eating disorder. It helped me find my strength and shaped my sense of wellness.
</p>
      </Row>
      <Row>
        <p className="lead">
I created Goddess Climbing to create a supportive community where women can build each other up, offer advice, and connect with one another. Because the climbing world can veer on the hyper-masculine, I believe there’s a need for women’s only climbing spaces. My goal is to encourage more women to join the sport and I will remain open to growth and feedback during this process. This is our community and we’re building it together.
</p>
      </Row>
      <Row>
        <p className="lead">
When I’m not running Goddess Climbing, I’m working full time at a climbing gym in Austin, riding my bike, exploring local hiking trails or playing guitar. But, I’d love to hear from you. You can write me by following the link below.
        </p>
      </Row>
    </Container>);
  }
}

export default About;
