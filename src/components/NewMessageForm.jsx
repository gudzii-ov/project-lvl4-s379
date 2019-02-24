import React from 'react';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import InputGroup from 'react-bootstrap/InputGroup';

import * as actions from '../actions';
import { withUser, withSocket } from '../context';

const mapStateToProps = (state) => {
  const props = {
    channelId: state.currentChannelId,
  };
  return props;
};

const actionCreators = {
  addMessageRequest: actions.addMessageRequest,
};

@connect(mapStateToProps, actionCreators)
@withUser
@withSocket
class NewMessageForm extends React.Component {
  constructor(props) {
    super(props);
    const { dispatch, socket } = this.props;
    const { fetchMessageSuccess } = actions;
    socket.on('newMessage', (message) => {
      dispatch(fetchMessageSuccess(message));
    });
  }

  handleSubmit = async (values) => {
    const {
      addMessageRequest, reset, channelId, userName,
    } = this.props;
    const message = { ...values, user: userName };
    try {
      await addMessageRequest({ message, channelId });
    } catch (e) {
      throw new SubmissionError({ _error: e.message });
    }
    reset();
  }

  render() {
    const {
      handleSubmit, submitting, pristine, error,
    } = this.props;
    return (
      <Form onSubmit={handleSubmit(this.handleSubmit)}>
        <Form.Group controlId="formSendMessage">
          <InputGroup>
            <Field
              type="text"
              disabled={submitting}
              className="form-control"
              placeholder="message"
              component="input"
              name="text"
              aria-describedby="btnGroupAddon"
            />
            <InputGroup.Append>
              <Button variant="primary" type="submit" disabled={pristine || submitting}>
                {submitting ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" /> : 'Send'}
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </Form.Group>
        {error && <Alert variant="danger">{`Unable to send message: ${error}. Try again later.`}</Alert>}
      </Form>
    );
  }
}

export default reduxForm({
  form: 'newMessage',
})(NewMessageForm);
