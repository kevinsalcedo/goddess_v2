import React from 'react';
import {Jumbotron} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import gear_shot from '../assets/Gear_Shot.jpg';
import '../css/Home.css';

class Home extends React.Component {

  render() {
    return (<div>
      <Jumbotron className="testy">
        <h1 className="statement display=3">[Mission Statement]</h1>
        <hr className="my-2"/>
        <p className="lead">
          Here's the statement
        </p>
      </Jumbotron>
    </div>);
  }
}

export default Home;
