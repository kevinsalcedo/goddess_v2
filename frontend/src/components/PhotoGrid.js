import React from 'react';
import {
  Container,
  Card,
  CardImg,
  CardBody,
  CardText,
  CardTitle,
  CardSubtitle,
  CardColumns,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  FormText
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
      currPhoto: {
        src: "",
        caption: ""
      },
      modalOpen: false,
      upload: {},
      uploadCharLimit: 100
    };
    this.handleViewer = this.handleViewer.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    this.updateData();
    this.setState({upload: new FormData()})
  }

  /* Fetches all visible photos from the api */
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

  /* Toggles image viewer open/close */
  handleViewer(photo) {
    this.setState({
      currPhoto: photo
    }, () => {
      this.setState({
        isOpen: !this.state.isOpen
      });
    });
  }

  /* Upload photo form handler, sets form data on field change */
  handleChange(event) {
    const upload = this.state.upload;
    const inputType = event.target.name;
    const inputValue = inputType === 'src' ? event.target.files[0] : event.target.value;
    upload.append(inputType, inputValue);
    this.setState({upload});

    if(inputType === 'caption') {
      this.setState({uploadCharLimit: 100 - inputValue.length});
    }
  }

  /* Upload form handler, sends POST request to api */
  handleSubmit() {
    const upload = this.state.upload;
    fetch('http://127.0.0.1:8000/api/upload/', {
      method: 'POST',
      body: upload
    })
    this.setState({modalOpen: false})
  }

  render() {
    const {all_photos, isOpen, currPhoto, modalOpen, uploadCharLimit} = this.state;

    if (all_photos.length > 0) {
      /* Title and upload button */
      return (
        <Container className="content-body">
        <Row>
          <Col xs="9">
            <h1>User Submitted Photos</h1>
          </Col>
          <Col xs="3">
            <Button className="form_button" onClick={() => {
                this.setState({modalOpen: true})
              }}>Upload</Button>
          </Col>
        </Row>

        {/* Photogrid dynamically fills in with photos from api */}
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

              {/* Popup lightbox viewer when image card is clicked */}
              <ImgsViewer imgs={[{
                    src: currPhoto.src,
                    caption: currPhoto.caption
                  }
                ]} showImgCount={false} width={960} isOpen={isOpen} onClose={() => {
                  this.handleViewer(photo)
                }}/>
            </Card>))
          }
        </CardColumns>

        {/* Modal pop up for image uploading */}
        <Modal sm="true" isOpen={modalOpen}>
          <ModalHeader>
            Submit Your Own Photo
          </ModalHeader>
          <ModalBody>
            <Form method="post" action="http://127.0.0.1:8000/api/upload/" onChange={(e) => this.handleChange(e)}>
              <FormGroup row>
                <Label for="SRC" sm={2}>Image</Label>
                <Col sm={10}>
                  <Input valid type="file" name="src" id="SRC"/>
                  <FormText></FormText>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="CLIMBER" sm={2}>Climber</Label>
                <Col sm={10}>
                  <Input type="text" name="climber" id="CLIMBER"/>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="LOCATION" sm={2}>Location</Label>
                <Col sm={10}>
                  <Input type="text" name="location" id="LOCATION"/>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="AUTHOR" sm={2}>Author</Label>
                <Col sm={10}>
                  <Input type="text" name="author" id="AUTHOR"/>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="CAPTION" sm={2}>Caption</Label>
                <Col>
                  <Input type="textarea" name="caption" id="CAPTION"/>
                  <FormText>{uploadCharLimit} / 100 characters remaining.</FormText>
                </Col>
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Col xs="6">
              <Button className="form_button" onClick={() => {
                  this.handleSubmit()
                }}>Submit</Button>
            </Col>
            <Col xs="6">
              <Button className="form_button" onClick={() => {
                  this.setState({modalOpen: false})
                }}>Cancel</Button>
            </Col>
          </ModalFooter>
        </Modal>
      </Container>);
    }
    /* Return error page if no photos */
    return (<Container className="content-body">
      <Error404/>
    </Container>);
  }
}

export default PhotoGrid;
