import React from 'react';
import {Container, Row, Col, Card} from 'reactstrap';

import Comment from './Comment.js';

import 'bootstrap/dist/css/bootstrap.css';
import '../css/PostDetail.css';

const api = 'http://goddess-env.5k5d6mwb3p.us-east-1.elasticbeanstalk.com/api/blog/';
const local = 'http://127.0.0.1:8000/api/blog/';

var current_endpoint = api;

class PostDetail extends React.Component {

  state = {
    post: {}
  };

  async componentDidMount() {
    this.updateData();
  }

  // Hit API for the appropriate post
  updateData = () => {
    try {
      const postId = (this.props.location.pathname).split("/blog/").pop();
      fetch(current_endpoint + `${postId}/`)
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        this.setState({post: response});
      });
      window.scrollTo(0,0);
    } catch (e) {
      console.log(e);
    }
  }

  // Extract the new post id from the url
  // If it does not equal the current state, reload.
  componentDidUpdate() {
    const isDifferentPost = this.state.post.id !== parseInt((this.props.location.pathname).split("/blog/").pop(), 10);
    if(isDifferentPost) {
      this.updateData();
    }
  }


  render() {
    const postContent = this.state.post.content;
    return (<Container className="content-body">
      <Row>
        <Col>
          <Card className="Post">
            <h1>{this.state.post.title}</h1>
            <h4>{this.state.post.pub_date}</h4>
            <hr/>
            <div className="post-content" dangerouslySetInnerHTML={{
                __html: postContent
              }}></div>
          </Card>
        </Col>
      </Row>
      <hr/>
      <Row>
        <Comment />
      </Row>
    </Container>);
  }
}

export default PostDetail;
