import React from 'react';
import {Container, Row, Col, Card, CardImg} from 'reactstrap';
import about_grace from '../assets/About_Grace.jpg';

import 'bootstrap/dist/css/bootstrap.css';
import '../css/About.css';

const api = 'http://goddess-env.5k5d6mwb3p.us-east-1.elasticbeanstalk.com/api/blog/9/'
const local = 'http://127.0.0.1:8000/api/blog/9/';

class About extends React.Component {

  state = {
    about: {}
  }

  async componentDidMount() {
    try {
      const res = await fetch(api);
      const about = await res.json();
      this.setState({about});
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return (<Container className="content-body">
      <Row>
        <Col className="my-auto">
          <h1 className="display-4">Learn More About The Owner</h1>
        </Col>
        <Col xs="4">
          <Card className="face-card my-auto rounded-circle">
            <CardImg className="about_grace rounded-circle" src={about_grace} alt="About Grace"/>
          </Card>
        </Col>
      </Row>
      <br/>
      <div className="lead" dangerouslySetInnerHTML={{
          __html: this.state.about.content
        }}></div>
      <br/>
      <hr/>

      <h1 className="display-4">Contact</h1>
      <br/>
      <p className="lead">When I’m not running Goddess Climbing, I’m working full time at a climbing gym in Austin, riding my bike, exploring local hiking trails or playing guitar. But, I’d love to hear from you. You can write me by following the link below or by subscribing to our email list.</p>
      <p className="lead"><a className="mailto" href="mailto:grace@goddessclimbing.com">grace@goddessclimbing.com</a></p>
    </Container>);
  }
}

export default About;
