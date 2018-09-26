import React from 'react';
import {Container} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import '../css/PhotoGrid.css';

class PhotoGrid extends React.Component {
  state = {
    photos: []
  }

  async componentDidMount() {
    this.updateData();
  }

  updateData = () => {
    try {
      fetch(`http://127.0.0.1:8000/api/photos/`)
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        this.setState({photos: response});
      });
      window.scrollTo(0,0);
    } catch (e) {
      console.log(e);
    }
  }
  render() {
    if (this.state.photos.length > 0) {
      console.log(this.state.photos);
      return (<Container className="content-body">

            {this.state.photos.map(photo => (
              <p>hello!</p>
            ))}
          </Container>
          );
    }
    return (<Container className="content-body">
      <p>nada</p>
    </Container>
    );
  }
}

export default PhotoGrid;
