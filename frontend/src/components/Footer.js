import React from 'react';
import { Link } from 'react-router-dom';
import {
  Col,
  Row,
  Form,
  FormGroup,
  Input,
  Label,
  Button
} from 'reactstrap';

import 'bootstrap/dist/css/bootstrap.css';
import '../css/Footer.css';
const api = 'http://goddess-env.5k5d6mwb3p.us-east-1.elasticbeanstalk.com/api/blog/?visible=true&ordering=-pub_date'
const local = 'http://127.0.0.1:8000/api/blog/?visible=true&ordering=-pub_date';

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
      fetch(api).then((response) => {
        return response.json();
      }).then((response) => {
        this.setState({recent_posts: response});
      });
      window.scrollTo(0,0);
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
          <h4 className="recents">Sign Up for our Newsletter</h4>
          <Form>
            <FormGroup>
              <Label for="firstname">First Name</Label>
              <Input type="text" name="first" id="firstname" />
            </FormGroup>
            <FormGroup>
              <Label for="lastname">Last Name</Label>
              <Input type="text" name="last" id="lastname" />
            </FormGroup>
            <FormGroup>
              <Label for="email">E-mail</Label>
              <Input type="email" name="email" id="email" />
            </FormGroup>
            <Button>Submit</Button>
          </Form>
        </Col>
      </Row>
      </div>
    );
  }
}

export default Footer;
