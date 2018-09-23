import React from 'react';
import {Container, Row, Col, Card, CardImg} from 'reactstrap';
import Sidebar from './Sidebar.js';
import about_grace from '../assets/About_Grace.jpg';

import 'bootstrap/dist/css/bootstrap.css';
import '../css/About.css';

class About extends React.Component {
  render() {
    return (<Container>
      <br/>
      <br/>
      <Row>
        <Col>
          <Row className="aboutSection">
            <Col>
              <h1 className="display-4">About Goddess Climbing</h1>
              <p className="lead">
                Welcome to Goddess Climbing. If you are reading this page, it means that you have some vested interest in rock climbing and in supporting the many women who love this sport like I do. Maybe you are a seasoned climber yourself; you’ve traveled far and wide to find the best crag, or you spend a majority of your time tracking your climbs on Mountain Project. Or maybe you are new to the sport, you discovered climbing through a friend or finally went to that gym you’ve been hearing about. Whether you are a beginner climber or advanced climber, whether you’re a weekend warrior or someone living the van life at crags everywhere, whether you are a gym goer or purely outdoor climber, this site is for you.
              </p>
            </Col>
          </Row>
          <hr/>
          <Row className="aboutSection">
            <Col>
              <h1 className="display-4">Learn More About The Owner</h1>
              <Row>
                <Col xs="3">
                  <Card className="face-card my-auto">
                    <CardImg className="about_grace" src={about_grace} alt="About Grace"/>
                  </Card>
                </Col>
                <Col>
                  <Row>
                    <p className="lead">My name is Grace Cline and I live in Austin,Texas. Besides running Goddess Climbing, I work full time at a climbing gym. When I’m not climbing, you can find me riding my bike, exploring local hiking trails or playing guitar. I started climbing around the age of 15 and fell in love immediately.</p>
                  </Row>
                  <Row>
                    <p className="lead">
                      Prior to getting into the sport, I spent about a year in treatment for an eating disorder and had not been allowed to exercise. Climbing was influential in my recovery, as it helped me develop a strong mind-body connection that I hadn’t had before.
                    </p>
                  </Row>
                </Col>
              </Row>
              <Row>
                <p className="lead">
                  Before leaving college, I helped develop the university’s climb team and began recognizing the need for a women’s only climbing space. At the gym where my team practiced, I often heard demeaning comments about the way women were dressed or climbing. I even noticed how my teammates would treat me differently than the males on the team-- often holding me to lower standards. I tried to get other females to join the team but noticed that most would go to one practice and then feel intimidated by the over-masculinity and never show up again. Though this gym was somewhat an extreme case, it signaled to me an issue that permeates climbing culture worldwide; which is the idea that men are innately stronger or better than women, and that they know what they’re doing better than women do.
                </p>
              </Row>
              <Row>
                <p className="lead">
                  I created Goddess Climbing to encourage more women to join the sport, and to create a supportive community where we can build each other up, offer advice, and connect with one another. My goal is to remain open to growth and feedback and help fill whatever gap still exists between genders in the climbing world. You can write to me by following this link.
                </p>
              </Row>
            </Col>
          </Row>
        </Col>
        <Sidebar/>
      </Row>
    </Container>);
  }
}

export default About;
