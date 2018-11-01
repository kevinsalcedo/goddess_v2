import React from 'react';
import {Link} from 'react-router-dom';
import {Container, Col, Row, Input, Label } from 'reactstrap';
import HTMLEllipsis from 'react-lines-ellipsis/lib/html';
import 'bootstrap/dist/css/bootstrap.css';
import '../css/PostList.css';

const api = 'http://goddess-env.5k5d6mwb3p.us-east-1.elasticbeanstalk.com/api/blog/?visible=true&ordering=';
const local = 'http://127.0.0.1:8000/api/blog/?visible=true&ordering=';

class PostList extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      sortOrder: '-pub_date'
    }

    this.handleChange = this.handleChange.bind(this);
  }

  async componentDidMount() {
    this.updateData();
  }

  updateData = () => {
    const link = local + this.state.sortOrder;
    try {
      fetch(link)
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        this.setState({posts: response});
      });
    } catch (e) {
      console.log(e);
    }
  }

  handleChange(event) {
    this.setState({sortOrder: event.target.value}, () => {
      this.updateData();
    });
  }

  render() {
    return (<Container className="content-body">
      <Row>
        <Col sm={12} md={9}>
          <h1 className="head-title">Blog</h1>
        </Col>
        <Col>
          <Input className="sortingSelect" type="select" name="select" id="select" onChange={(e) => this.handleChange(e)}>
            <option value="-pub_date">Newest to Oldest</option>
            <option value="pub_date">Oldest to Newest</option>
          </Input>
        </Col>
      </Row>
      <br />
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
