import React from 'react';
import { Container, Form, FormGroup, Input, Button } from 'reactstrap';
import { Link, Location} from 'react-router-dom';

class Comment extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      upload: {}
    }

    this.submitComment = this.submitComment.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    var upload = new FormData();
    upload.append('post', (window.location.href).split("/blog/").pop());
    upload.append('pub_date', new Date().toISOString().slice(0,10));

    console.log()

    this.setState({upload});
  }

  handleChange(event) {
    const upload = this.state.upload;
    upload.append('comment_text', event.target.value);
    this.setState({upload});
    var today = new Date().toISOString().slice(0,10);
    console.log(today);
  }

  submitComment() {
      const upload = this.state.upload;

      try {


        fetch('http://127.0.0.1:8000/api/comment/', {
          method: 'POST',
          body: upload
        }).then((response) => {
          console.log(response);
        });
        window.scrollTo(0, 0);
      } catch (e) {
        console.log('failed');
      }
  }

  render() {
    return (<Container>
      <h1>Leave a Comment!</h1>
      <Form onChange={(e) => this.handleChange(e)}>
        <FormGroup>
          <Input type="textarea" id="text" name="text"/>
        </FormGroup>
        <Button onClick={() => this.submitComment()}>Submit</Button>
      </Form>
    </Container>);
  }

}

export default Comment;
