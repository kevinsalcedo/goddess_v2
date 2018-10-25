import React from 'react';
import { Container, Form, FormGroup, Input, Button, Card, CardText, CardTitle } from 'reactstrap';
import { Link, Location} from 'react-router-dom';

const api = 'http://goddess-env.5k5d6mwb3p.us-east-1.elasticbeanstalk.com/api/blog_comment/';
const local = 'http://127.0.0.1:8000/api/blog_comment/';

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
    upload.append('comment_text', event.target.value);
    this.setState({upload});
  }

  submitComment(event) {
      const upload = this.state.upload;

      try {
        fetch('http://127.0.0.1:8000/api/comment/', {
          method: 'POST',
          body: upload
        }).then((response) => {
          console.log(response);
        }).then(() => {
          this.updateData();
          console.log(event);
        });
      } catch (e) {
        console.log('failed');
      }
  }

  updateData = () => {
    try {
      const postId = (window.location.href).split("/blog/").pop();
      fetch(local + `?post=${postId}`)
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
        <div>
          <Card>
            <CardTitle>Kevin</CardTitle>
            <CardText>{comment.comment_text}</CardText>
          </Card>
          <hr/>
        </div>
    ))}
      <Form onChange={(e) => this.handleChange(e)}>
        <FormGroup>
          <Input type="textarea" id="text" name="text"/>
        </FormGroup>
        <Button onClick={(e) => this.submitComment(e)}>Submit</Button>
      </Form>
    </Container>);
  }

}

export default Comment;
