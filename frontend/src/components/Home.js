import React from 'react';
import {Container} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import '../css/Home.css';

class Home extends React.Component {

  state = {
    post: {}
  };

  async componentDidMount() {
    try {
      const res = await fetch(`http://goddess-env.5k5d6mwb3p.us-east-1.elasticbeanstalk.com/api/blog/8/`);
      const post = await res.json();
      this.setState({post});
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return (<Container className="content-body">
      <h1 className="display-3">
        {this.state.post.title}
      </h1>
      <hr/>
      <div dangerouslySetInnerHTML={{
          __html: this.state.post.content
        }}></div>
    </Container>);
  }
}

export default Home;
