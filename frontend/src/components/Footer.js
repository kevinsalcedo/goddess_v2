import React from 'react';
import { Link } from 'react-router-dom';
import {
  Col,
  Row,
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
      fetch(`http://127.0.0.1:8000/api/`).then((response) => {
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
        <Col className="info-col-1">
          <Row>
            <h4 className="recents">Recent Posts</h4>
          </Row>
          {this.state.recent_posts.map(post =>
            <Row key={post.id}>
              <Link className="recentLink" to={{pathname: `/blog/${post.id}`}}>{post.title}</Link>
               </Row>
          )}
        </Col>
        <Col className="info-col-2">

        </Col>
        <Col className="info-col-3">
       </Col>
      </Row>
      </div>
    );
  }
}

export default Footer;
