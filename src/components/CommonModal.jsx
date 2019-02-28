import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import connect from '../connect';

const mapStateToProps = ({ modalState, modalUIState }) => ({ ...modalState, ...modalUIState });

@connect(mapStateToProps)
class CommonModal extends React.Component {
  handleClose = () => {
    const { toggleModal } = this.props;
    toggleModal({ modalType: '' });
  }

  handleConfirm = () => {
    const { toggleModal, modalAction } = this.props;
    modalAction();
    toggleModal({ modalType: '' });
  }

  render() {
    const { modalType, modalHeader, modalBody } = this.props;

    return (
      <Modal show={modalType === 'common'} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{modalHeader}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalBody}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleClose}>
              Cancel
          </Button>
          <Button variant="primary" onClick={this.handleConfirm}>
              OK
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default CommonModal;
