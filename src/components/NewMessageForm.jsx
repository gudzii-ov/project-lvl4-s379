import React from 'react';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import InputGroup from 'react-bootstrap/InputGroup';

import connect from '../connect';
import { withUser } from '../context';

const mapStateToProps = state => ({ channelId: state.currentChannelId });

@connect(mapStateToProps)
@reduxForm({ form: 'newMessage' })
@withUser
class NewMessageForm extends React.Component {
  handleSubmit = async (values) => {
    const {
      addMessage, reset, channelId, userName,
    } = this.props;
    const message = { ...values, user: userName };
    try {
      await addMessage({ message, channelId });
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

export default NewMessageForm;
