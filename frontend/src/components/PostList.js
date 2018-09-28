import React from 'react';
import {Link} from 'react-router-dom';
import {Container, Col, Row} from 'reactstrap';
import HTMLEllipsis from 'react-lines-ellipsis/lib/html';
import 'bootstrap/dist/css/bootstrap.css';
import '../css/PostList.css';

class PostList extends React.Component {
  state = {
    posts: []
  }

  async componentDidMount() {
    this.updateData();
  }

  updateData = () => {
    try {
      fetch(`http://goddess-env.5k5d6mwb3p.us-east-1.elasticbeanstalk.com/api/blog/`)
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        this.setState({posts: response});
      });
      window.scrollTo(0,0);
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return (<Container className="content-body">
      <h1>Grace's Blog</h1>
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
