import React from 'react';
import { Container, Form, FormGroup, Input, Button } from 'reactstrap';

class Comment extends React.Component {

  state = {
    commentText: "placeholder",
  }

  constructor(props) {
    super(props);

    this.submitComment = this.submitComment.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({commentText: event.target.value});
  }

  submitComment() {
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
