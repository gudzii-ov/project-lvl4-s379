import React from 'react';
import { connect } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import * as actions from '../actions';

const mapStateToProps = ({ modalState, modalUIState }) => ({ ...modalState, ...modalUIState });

@connect(mapStateToProps)
class CommonModal extends React.Component {
  handleClose = () => {
    const { dispatch } = this.props;
    dispatch(actions.toggleModalUIState({ wichModal: '' }));
  }

  handleConfirm = () => {
    const { dispatch, modalAction } = this.props;
    modalAction();
    dispatch(actions.toggleModalUIState({ wichModal: '' }));
  }

  render() {
    const { wichModal, modalHeader, modalBody } = this.props;

    return (
      <Modal show={wichModal === 'common'} onHide={this.handleClose}>
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
