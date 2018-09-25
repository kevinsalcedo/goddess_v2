import React from 'react';
import Sidebar from './Sidebar.js';
import {Container, Row, Col, Card} from 'reactstrap';

import 'bootstrap/dist/css/bootstrap.css';
import '../css/PostDetail.css';
class PostDetail extends React.Component {

  state = {
    post: {}
  };

  async componentDidMount() {
    try {
      const postId = (this.props.location.pathname).split("/blog/").pop();
      const res = await fetch(`http://127.0.0.1:8000/api/${postId}/`);
      const post = await res.json();
      this.setState({post});
    } catch (e) {
      console.log(e);
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
            <div dangerouslySetInnerHTML={{
                __html: postContent
              }}></div>
          </Card>
        </Col>
        {/*}<Sidebar/>*/}
      </Row>
    </Container>);
  }
}

export default PostDetail;
