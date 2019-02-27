import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

import * as actions from '../actions';

const mapStateToProps = ({ modalState, modalUIState }) => ({ ...modalState, ...modalUIState });

const actionCreators = {
  renameChannelRequest: actions.renameChannelRequest,
};

@connect(mapStateToProps, actionCreators)
@reduxForm({ form: 'modalForm' })
class CommonModal extends React.Component {
  handleClose = () => {
    const { dispatch } = this.props;
    dispatch(actions.toggleModalUIState({ wichModal: '' }));
  }

  handleSubmit = async (values) => {
    const {
      dispatch, reset, modalAction,
    } = this.props;
    try {
      await modalAction(values);
    } catch (e) {
      throw new SubmissionError({ _error: e.message });
    }
    reset();
    dispatch(actions.toggleModalUIState({ wichModal: '' }));
  }

  render() {
    const {
      handleSubmit, submitting, pristine, error, wichModal, modalHeader,
    } = this.props;

    return (
      <Modal show={wichModal === 'form'} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{modalHeader}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit(this.handleSubmit)}>
          <Form.Group controlId="formAddChannel">
            <Modal.Body>
              <Field
                type="text"
                disabled={submitting}
                className="form-control"
                placeholder="channel name"
                component="input"
                name="name"
                aria-describedby="btnGroupAddon"
              />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleClose}>
                Cancel
              </Button>
              <Button variant="primary" type="submit" disabled={pristine || submitting}>
                {submitting ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" /> : 'OK'}
              </Button>
            </Modal.Footer>
          </Form.Group>
          {error && <Alert variant="danger">{`Unable to add channel: ${error}. Try again later.`}</Alert>}
        </Form>
      </Modal>
    );
  }
}

export default CommonModal;