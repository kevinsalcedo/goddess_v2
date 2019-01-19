import React from 'react';
import {Container, Row, Col, Card} from 'reactstrap';
import {Link} from 'react-router-dom';
import global_endpoint from './global_endpoint.js';

import Comment from './Comment.js';

import 'bootstrap/dist/css/bootstrap.css';
import '../css/PostDetail.css';

class PostDetail extends React.Component {

  state = {
    post: {},
    tagList: {}
  };

  async componentDidMount() {
    fetch(global_endpoint + "/api/tags")
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      this.setState({tagList: response});
    })
    .then(() => {
      this.updateData();
    });
  }

  // Hit API for the appropriate post
  updateData = () => {
    try {
      const postId = (this.props.location.pathname).split("/blog/").pop();
      fetch(global_endpoint + `/api/blog/${postId}/`)
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
    const tagList = this.state.tagList;
    if(this.state.post.hasOwnProperty('id')) {
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
              {console.log(postContent)}
              <hr/>
              <Row>
              <Col sm={2}>
              <h4>Tags:</h4>
              </Col>
              <Col>
              <p>
              {this.state.post.tags.length === 0 ? <span>No tags</span> : this.state.post.tags.map(tag => (
                <Link className="link" to="#"><span>{(this.state.tagList.find(obj => obj.id === tag)).title}</span> </Link>
              ))}
              </p>
              </Col>
              </Row>
            </Card>
          </Col>
        </Row>
        <hr/>
        <Row>
          <Comment />
        </Row>
      </Container>);
    } else {
      return null;
    }

  }
}

export default PostDetail;
