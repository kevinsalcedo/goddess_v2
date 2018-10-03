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
      isOpen: false,
      modalOpen: false,
      upload: {}
    };
    this.handleViewer = this.handleViewer.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    this.updateData();
    this.setState({upload: new FormData()})
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

  handleChange(event, inputType) {
    const upload = this.state.upload;
    if (inputType === "file") {
      upload.append('src', event.target.files[0]);
    }
    if (inputType === "location") {
      upload.append('location', event.target.value);
    }
    if (inputType === "climber") {
      upload.append('climber', event.target.value);
    }
    if (inputType === "author") {
      upload.append('aytgir', event.target.value);
    }
    if (inputType === "caption") {
      upload.append('caption', event.target.value);
    }
    this.setState({upload});
  }

  handleSubmit() {
    const upload = this.state.upload;
    let data = new FormData();
    data.append('climber', upload.climber);
    data.append('location', upload.location);
    data.append('author', upload.author);
    data.append('caption', upload.caption);

    fetch('http://127.0.0.1:8000/api/upload/', {
      method: 'POST',
      body: upload
    })

    this.setState({modalOpen: false})
  }

  render() {
    const {all_photos, isOpen, currPhoto} = this.state;

    if (all_photos.length > 0) {
      return (<Container className="content-body">
        <Row>
          <Col xs="12" md="9">
            <h1>User Submitted Photos</h1>
          </Col>
          <Col xs="12" md="3">
            <Button onClick={() => {
                this.setState({modalOpen: true})
              }}>Upload</Button>
          </Col>
        </Row>
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

        <Modal isOpen={this.state.modalOpen}>
          <ModalHeader>
            Submit Your Own Photo
          </ModalHeader>
          <ModalBody>
            <Form method="post" action="http://127.0.0.1:8000/api/upload/">
              <FormGroup row="row">
                <Label for="SRC" sm={2}>Image</Label>
                <Col sm={10}>
                  <Input onChange={(e) => {
                      this.handleChange(e, "file");
                    }} type="file" name="src" id="SRC"/>
                  <FormText></FormText>
                </Col>
              </FormGroup>
              <FormGroup row="row">
                <Label for="CLIMBER" sm={2}>Climber</Label>
                <Col sm={10}>
                  <Input onChange={(e) => {
                      this.handleChange(e, "climber");
                    }} type="text" name="climber" id="CLIMBER"/>
                </Col>
              </FormGroup>
              <FormGroup row="row">
                <Label for="LOCATION" sm={2}>Location</Label>
                <Col sm={10}>
                  <Input onChange={(e) => {
                      this.handleChange(e, "location");
                    }} type="text" name="location" id="LOCATION"/>
                </Col>
              </FormGroup>
              <FormGroup row="row">
                <Label for="AUTHOR" sm={2}>author</Label>
                <Col sm={10}>
                  <Input onChange={(e) => {
                      this.handleChange(e, "author");
                    }} type="text" name="author" id="AUTHOR"/>
                </Col>
              </FormGroup>
              <FormGroup row="row">
                <Label for="CAPTION" sm={2}>Caption</Label>
                <Col>
                  <Input onChange={(e) => {
                      this.handleChange(e, "caption");
                    }} type="textarea" name="caption" id="CAPTION"/>
                </Col>
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Col>
              <Button onClick={() => {
                  this.handleSubmit()
                }}>Submit</Button>
            </Col>
            <Col>
              <Button onClick={() => {
                  this.setState({modalOpen: false})
                }}>Cancel</Button>
            </Col>
          </ModalFooter>
        </Modal>
      </Container>);
    }
    return (<Container className="content-body">
      <Error404/>
    </Container>);
  }
}

export default PhotoGrid;
