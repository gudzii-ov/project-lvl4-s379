import React from 'react';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import * as actions from '../actions';
import { withUser } from '../user-context';

const mapStateToProps = (state) => {
  const props = {
    text: state.text,
    channelId: state.currentChannelId,
  };
  return props;
};

const actionCreators = {
  addMessageRequest: actions.addMessageRequest,
};

@connect(mapStateToProps, actionCreators)
@withUser
class NewMessageForm extends React.Component {
  constructor(props) {
    super(props);
    const { dispatch } = this.props;
    const socket = io.connect('/');
    dispatch(actions.fetchMessageSocket(socket));
  }

  componentWillUnmount() {
    this.socket.disconnect();
  }

  handleSubmit = async (values) => {
    const {
      addMessageRequest, reset, channelId, userName,
    } = this.props;
    // const userName = this.context;
    // console.log(userName);
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
      <form onSubmit={handleSubmit(this.handleSubmit)}>
        <div className="input-group mb-3">
          <Field
            type="text"
            disabled={submitting}
            className="form-control"
            placeholder="message"
            aria-label="Message"
            aria-describedby="basic-addon2"
            component="input"
            name="text"
          />
          <div className="input-group-append">
            <button className="input-group-text btn btn-primary" id="basic-addon2" type="submit" disabled={pristine || submitting}>
              {submitting ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" /> : 'Send'}
            </button>
          </div>
        </div>
        {error && <div className="alert alert-danger">{`Unable to send message: ${error}. Try again later.`}</div>}
      </form>
    );
  }
}

// NewMessageForm.contextType = UserContext;

export default reduxForm({
  form: 'newMessage',
})(NewMessageForm);
