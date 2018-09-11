import React from 'react';
import { Jumbotron } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';

class Home extends React.Component {
  state = {
    posts: []
  };

  async componentDidMount() {
    try {
      const res = await fetch('http://127.0.0.1:8000/api/');
      const posts = await res.json();
      this.setState({
        posts
      });
    } catch (e) {
      console.log(e);
    }
  }


  render() {
    return (
      <div>
        <Jumbotron>
          <h1 className="display=3">[Mission Statement]</h1>
          <hr className="my-2"/>
          <p className="lead">
            Here's the statement
          </p>
        </Jumbotron>

        <div>
        {this.state.posts.map(item => (
          <div key={item.id}>
            <h1>{item.title}</h1>
            <span>{item.content}</span>
          </div>
        ))}
      </div>

     </div>
      );
  }
}

export default Home;
