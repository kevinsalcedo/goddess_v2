import React from 'react';
import { Link } from 'react-router-dom';
import {
  Col,
  Row,
  Form,
  FormGroup,
  Input,
  Label,
} from 'reactstrap';

import 'bootstrap/dist/css/bootstrap.css';
import '../css/Footer.css';

const api = 'http://goddess-env.5k5d6mwb3p.us-east-1.elasticbeanstalk.com/api/blog/?visible=true&ordering=-pub_date'
const local = 'http://127.0.0.1:8000/api/blog/?visible=true&ordering=-pub_date';

var current_endpoint = api;

class Footer extends React.Component {

  constructor(props) {
    super(props);
    this.formatDate = this.formatDate.bind(this);
  }

  state = {
    recent_posts: []
  }

  async componentDidMount() {
    this.updateData();
  }

  // Hit API for all posts - need to make just 5 most recent
  updateData = () => {
    try {
      fetch(current_endpoint).then((response) => {
        return response.json();
      }).then((response) => {
        this.setState({recent_posts: response});
      });
      // window.scrollTo(0,0);
    } catch (e) {
      console.log(e);
    }
  }

  formatDate(date) {
    let d = new Date(date);
    return d.toLocaleDateString("en-US", {month: "long", day: "numeric"})
  }

  render() {
    return (
      <div className="footer">
        <hr />
        <Row>
        <Col xs="12" md="4" className="info-col-1">
          <h4 className="recents">Recent Posts</h4>
          {this.state.recent_posts.map(post =>
            <div key={post.id}>
              <Link className="recentLink" to={{pathname: `/blog/${post.id}`}}>{post.title} | {this.formatDate(post.pub_date)}</Link>
            </div>
          )}
        </Col>
        <Col xs="12" md="8" className="info-col-2">
          <h4 className="recents">Sign Up for Our Newsletter</h4>
          <Form action="https://goddessclimbing.us19.list-manage.com/subscribe/post?u=a3ef7908a1a1d9b51024e6291&amp;id=8a42b55b15" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" className="validate" target="_blank" noValidate>
            <FormGroup>
              <Label for="mce-EMAIL">Email Address</Label>
              <Input type="email" name="EMAIL" id="mce-EMAIL"/>
            </FormGroup>
            <FormGroup>
              <Label for="mce-FNAME">First Name</Label>
              <Input type="text" name="FNAME" id="mce-FNAME"/>
            </FormGroup>
            <FormGroup>
              <Label for="mce-LNAME">Last Name</Label>
              <Input type="text" name="LNAME" id="mce-LNAME"/>
            </FormGroup>
            <div hidden aria-hidden><input type="text" name="b_a3ef7908a1a1d9b51024e6291_8a42b55b15" tabIndex="-1"/></div>
            <div className="clear"><input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" className="button"/></div>
          </Form>
        </Col>
      </Row>
      </div>
    );
  }
}

export default Footer;
