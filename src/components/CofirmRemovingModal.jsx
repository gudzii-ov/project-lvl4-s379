import React from 'react';
import { connect } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import * as actions from '../actions';

const mapStateToProps = ({ modalUIState, channelForRemoval }) => ({ ...modalUIState, ...channelForRemoval });

@connect(mapStateToProps)
class ConfirmRemovingModal extends React.Component {
  handleClose = () => {
    const { dispatch } = this.props;
    dispatch(actions.toggleModalUIState());
  }

  handleConfirm = () => {
    const { dispatch, channelId } = this.props;
    dispatch(actions.removeChannelRequest({ channelId }));
    dispatch(actions.toggleModalUIState());
  }

  render() {
    const { show } = this.props;

    return (
      <Modal show={show} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Channel removing</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you really want to remove channel?</Modal.Body>
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

export default ConfirmRemovingModal;
