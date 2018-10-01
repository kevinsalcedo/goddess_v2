import React from 'react';
import { Container, Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';

class UploadPhoto extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      modal: props.modal
    };

    this.closeModal = this.closeModal.bind(this);
  }

  closeModal() {
    this.setState({modal: false})
  }

  render () {
    return (
      <Modal isOpen={this.state.modal}>
        <ModalBody>
          <p>Hello</p>
        </ModalBody>
        <ModalFooter>
          <Button onClick={this.closeModal()}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default UploadPhoto;
