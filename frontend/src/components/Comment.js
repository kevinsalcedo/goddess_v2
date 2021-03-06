import React from 'react';
import { Container, Form, FormGroup, Input, Button, Card, CardText, CardTitle, Label, Col, Row } from 'reactstrap';

const api = 'http://goddess-env.5k5d6mwb3p.us-east-1.elasticbeanstalk.com/api/blog_comment/';
const local = 'http://127.0.0.1:8000/api/blog_comment/';

const upload_api = 'http://goddess-env.5k5d6mwb3p.us-east-1.elasticbeanstalk.com/api/comment/';
const upload_local = 'http://127.0.0.1:8000/api/comment/';

var current_endpoint = api;
var current_upload = upload_api;

class Comment extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      upload: {},
      curr_comments: []
    }

    this.submitComment = this.submitComment.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.updateData = this.updateData.bind(this);
  }

  componentDidMount() {
    // Create empty comment entry
    var upload = new FormData();
    upload.append('post', (window.location.href).split("/blog/").pop());
    upload.append('pub_date', new Date().toISOString().slice(0,10));
    this.setState({upload});

    // Retrieve all comments for current post
    this.updateData();
  }

  handleChange(event) {
    const upload = this.state.upload;
    upload.append(event.target.name, event.target.value);
    this.setState({upload});
  }

  submitComment(event) {
      const upload = this.state.upload;
      try {
        fetch(current_upload, {
          method: 'POST',
          body: upload
        }).then((response) => {
        }).then(() => {
          this.updateData();
        });
      } catch (e) {
        console.log('failed');
      }
  }

  updateData = () => {
    try {
      const postId = (window.location.href).split("/blog/").pop();
      fetch(current_endpoint + `?post=${postId}`)
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        this.setState({curr_comments: response});
      });
    } catch (e) {
      console.log(e);
    }
  }


  render() {
    const {curr_comments} = this.state;
    return (<Container>
      <h1>Leave a Comment!</h1>
      {curr_comments.map(comment => (
        <div key={comment.id}>
          <Card>
            <CardTitle>{comment.name}</CardTitle>
            <CardText>{comment.comment_text}</CardText>
          </Card>
          <hr/>
        </div>
    ))}
      <Form onChange={(e) => this.handleChange(e)} ref="form">
        <FormGroup>
        <Row>
          <Label sm={3} for="name">Name (optional):</Label>
          <Col><Input type="text" id="name" name="name" ref="name"/></Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Input type="textarea" id="comment_text" name="comment_text" ref="comment_text"/>
        </FormGroup>
        <Button type="reset" onClick={(e) => this.submitComment(e)}>Submit</Button>
      </Form>


    </Container>);
  }

}

export default Comment;
