import React from 'react';
import {Container, Card, CardImg, CardBody, CardText, CardTitle, CardSubtitle, CardColumns } from 'reactstrap';
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
      fetch(`http://127.0.0.1:8000/api/photos/?visible=true`)
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
      return (
        <Container className="content-body">
          <h1>User Submitted Photos</h1>
        <CardColumns className="photo_grid">
            {this.state.photos.map(photo => (
              <Card className="photo_card" key={photo.id}>
                <CardImg className="photo_img" top src={photo.file} />
                <CardBody>
                  <CardTitle>Location: {photo.location}</CardTitle>
                  <CardSubtitle>Author: {photo.author}</CardSubtitle>
                  <CardText>{photo.caption}</CardText>
                </CardBody>
              </Card>
            ))}
          </CardColumns>
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
