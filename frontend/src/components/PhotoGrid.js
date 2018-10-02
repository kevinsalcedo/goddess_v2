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
import ImgsViewer from 'react-images-viewer';
import 'bootstrap/dist/css/bootstrap.css';
import '../css/PhotoGrid.css';

const api = 'http://goddess-env.5k5d6mwb3p.us-east-1.elasticbeanstalk.com/api/photos/?visible=true'
const local = 'http://127.0.0.1:8000/api/photos/?visible=true';

class PhotoGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      all_photos: [],
      currPhoto: {src: "", caption: ""},
      isOpen: false
    };
    this.handleViewer = this.handleViewer.bind(this);
  }

  async componentDidMount() {
    this.updateData();
  }

  updateData = () => {
    try {
      fetch(api).then((response) => {
        return response.json();
      }).then((response) => {
        this.setState({all_photos: response});
      });
      window.scrollTo(0, 0);
    } catch (e) {
      console.log(e);
    }
  }

  handleViewer(photo) {
    this.setState({
      currPhoto: photo
    }, () => {
      this.setState({
        isOpen: !this.state.isOpen
      });
    });
  }

  render() {
    const {all_photos, isOpen, currPhoto} = this.state;

    if (all_photos.length > 0) {
      return (<Container className="content-body">
        <h1>User Submitted Photos</h1>
        <CardColumns className="photo_grid">
          {
            all_photos.map(photo => (<Card key={photo.id} className="photo_card" onClick={() => {
                this.handleViewer(photo)
              }}>
              <CardImg className="photo_img" top src={photo.src}/>
              <CardBody>
                <CardTitle>{photo.climber}
                  @ {photo.location}</CardTitle>
                <CardSubtitle>Author: {photo.author}</CardSubtitle>
                <CardText>{photo.caption}</CardText>
              </CardBody>

              <ImgsViewer imgs={[{
                    src: currPhoto.src,
                    caption: currPhoto.caption
                  }
                ]} showImgCount={false} width={960} isOpen={this.state.isOpen} onClose={() => {
                  this.handleViewer(photo)
                }}/>
            </Card>))
          }
        </CardColumns>
      </Container>);
    }
    return (<Container className="content-body">
      <Error404/>
    </Container>);
  }
}

export default PhotoGrid;
