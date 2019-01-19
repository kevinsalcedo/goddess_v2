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
import global_endpoint from "./global_endpoint.js";

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
      uploadCharLimit: 100,
      confirmOpen: false,
      confirmBody: "",
      confirmHeader: "",
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
      fetch(global_endpoint + "/api/photos/?visible=true").then((response) => {
        return response.json();
      }).then((response) => {
        this.setState({all_photos: response});
      });
      // window.scrollTo(0, 0);
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

    try {
      fetch(global_endpoint + "/api/upload/", {
        method: 'POST',
        body: upload
      }).then((response) => {
        if(response.status === 400) {
          console.log('Bad request!');
          this.setState({confirmHeader: "Uh Oh! Upload Failed.", confirmBody: "Please check your info and try again."});
        } else if (response.status === 201) {
          console.log('Uploaded, awaiting approval!');
          this.setState({confirmHeader: "Upload success!", confirmBody: "Check back soon to see if your photo was approved!"});
        } else {
          console.log('Uh oh. Error code:' + response.status);
          this.setState({confirmHeader: "Upload Error.", confirmBody: "Uh oh, something went wrong on our end. Please try again."});
        }
      });
      window.scrollTo(0, 0);
    } catch (e) {
      console.log('failed');
    }
    this.setState({modalOpen: false, confirmOpen: true});
  }

  render() {
    const {all_photos, isOpen, currPhoto, modalOpen, uploadCharLimit, confirmOpen, confirmBody, confirmHeader} = this.state;

    if (all_photos.length > 0) {
      /* Title and upload button */
      return (
        <Container className="content-body">
        <Row>
            <h1>User Submitted Photos</h1>
          </Row>
          <Row>
            <Col>
              <p className="lead">If you want a photo of you or your friends climbing featured on our website, submit them here, along with a short description of why you climb!</p>
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
                <CardTitle className="lead card-title">{photo.climber} @ {photo.location}</CardTitle>
                <CardSubtitle>Author: {photo.author}</CardSubtitle>
                <CardText className="card-text">{photo.caption}</CardText>
              </CardBody>

              
            </Card>))
          }
        </CardColumns>
        {/* Popup lightbox viewer when image card is clicked */}
        <ImgsViewer imgs={[{
                    src: currPhoto.src,
                    caption: currPhoto.caption
                  }
                ]} showImgCount={false} width={960} isOpen={isOpen} onClose={() => {
                  this.handleViewer(currPhoto)
                }}/>
        {console.log(currPhoto)}
        {/* Modal pop up for image uploading */}
        <Modal sm="true" isOpen={modalOpen}>
          <ModalHeader>
            Submit Your Own Photo
          </ModalHeader>
          <ModalBody>
            <Form method="post" onChange={(e) => this.handleChange(e)}>
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
                <Label for="CAPTION" sm={12}>Why do you climb?</Label>
                <Col>
                  <Input type="textarea" name="caption" id="CAPTION"/>
                  <FormText>{uploadCharLimit} / 100 characters remaining.</FormText>
                </Col>
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Col xs="6">
              <Button className="form_button submit_button" onClick={() => {
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
        <Modal sm="true" isOpen={confirmOpen}>
          <ModalHeader>
            {confirmHeader}
          </ModalHeader>
          <ModalBody>
            {confirmBody}
          </ModalBody>
          <ModalFooter>
          <Button className="form_button" onClick={() => {
            this.setState({confirmOpen: false});
          }}>Close</Button>
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
