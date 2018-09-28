import React from 'react';
import {
  Container,
  Card,
  CardImg,
  CardBody,
  CardText,
  CardTitle,
  CardSubtitle,
  CardColumns
} from 'reactstrap';
import Error404 from './error404';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import 'bootstrap/dist/css/bootstrap.css';
import '../css/PhotoGrid.css';

class PhotoGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      all_photos: [],
      currPhoto: {},
      isOpen: false
    };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  async componentDidMount() {
    this.updateData();
  }

  updateData = () => {
    try {
      fetch(`http://goddess-env.5k5d6mwb3p.us-east-1.elasticbeanstalk.com/api/photos/?visible=true`).then((response) => {
        return response.json();
      }).then((response) => {
        this.setState({all_photos: response});
      });
      window.scrollTo(0, 0);
    } catch (e) {
      console.log(e);
    }
  }

handleOpen(photo) {
  if (!this.state.isOpen) {
    this.setState({currPhoto: photo}, () =>
      {
        this.setState({isOpen: true});
      });
  }
}

  handleClose() {
    this.setState({isOpen: false}, () => {
      this.setState({currPhoto: {}})
    });
  }
  render() {
    const {all_photos, isOpen, currPhoto} = this.state;

    if (all_photos.length > 0) {
      return (<Container className="content-body">
        <h1>User Submitted Photos</h1>
        <CardColumns className="photo_grid">
          {
            all_photos.map(photo => (
              <Card key={photo.id} className="photo_card" onClick={() => {this.handleOpen(photo)}}>
                <CardImg className="photo_img" top src={photo.file} />
                <CardBody>
                  <CardTitle>Location: {photo.location}</CardTitle>
                  <CardSubtitle>Author: {photo.author}</CardSubtitle>
                  <CardText>{photo.caption}</CardText>
                </CardBody>

                {isOpen &&
                  <Lightbox
                  mainSrc={currPhoto.file}
                  onCloseRequest={() => {this.handleClose()}}
                  imagePadding={50}
                  imageCaption={currPhoto.caption}
                  />
                }
              </Card>))
            }
      </CardColumns>
    </Container>); } return (<Container className="content-body">
      <Error404/>
    </Container>);
  }
}

export default PhotoGrid;
