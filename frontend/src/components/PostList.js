import React from 'react';
import {Link} from 'react-router-dom';
import {Container, Col, Row} from 'reactstrap';
import HTMLEllipsis from 'react-lines-ellipsis/lib/html';
import Sidebar from './Sidebar';
import 'bootstrap/dist/css/bootstrap.css';
import '../css/PostList.css';

class PostList extends React.Component {
  state = {
    posts: []
  }

  async componentDidMount() {
    try {
      const res = await fetch('http://127.0.0.1:8000/api/');
      const posts = await res.json();
      this.setState({posts});
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return (<Container className="content-body">
      <Row>
        <Col>
          {
            this.state.posts.map(post => (<Link className="postLink" to={{
                pathname: `/blog/${post.id}`
              }} key={post.id}>
              <div>
                <h2>{post.title} <span className='pub-date'>{post.pub_date}</span></h2>
                <HTMLEllipsis className="desc"
                  unsafeHTML={post.content}
                  maxLine='2'
                  ellipsis='...'
                  basedOn='words'
                />
                <hr/>
              </div>
            </Link>))
          }
        </Col>
      </Row>
    </Container>)
  }
}

export default PostList;
