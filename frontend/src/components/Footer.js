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

class Footer extends React.Component {

  state = {
    recent_posts: []
  }

  async componentDidMount() {
    this.updateData();
  }

  // Hit API for all posts - need to make just 5 most recent
  updateData = () => {
    try {
      fetch(`http://127.0.0.1:8000/api/blog/`).then((response) => {
        return response.json();
      }).then((response) => {
        this.setState({recent_posts: response});
      });
      window.scrollTo(0,0);
    } catch (e) {
      console.log(e);
    }
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
              <Link className="recentLink" to={{pathname: `/blog/${post.id}`}}>{post.title}</Link>
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
