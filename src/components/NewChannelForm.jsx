import React from 'react';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import InputGroup from 'react-bootstrap/InputGroup';

import connect from '../connect';

const mapStateToProps = () => ({});

@connect(mapStateToProps)
@reduxForm({ form: 'newChannel' })
class NewChannelForm extends React.Component {
  handleSubmit = async (values) => {
    const { addChannel, reset } = this.props;
    const channel = { ...values };
    try {
      await addChannel({ channel });
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
        <Form.Group controlId="formAddChannel">
          <InputGroup>
            <Field
              type="text"
              disabled={submitting}
              className="form-control"
              placeholder="channel name"
              component="input"
              name="name"
              aria-describedby="btnGroupAddon"
            />
            <InputGroup.Append>
              <Button variant="primary" type="submit" disabled={pristine || submitting}>
                {submitting ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" /> : 'Add'}
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </Form.Group>
        {error && <Alert variant="danger">{`Unable to add channel: ${error}. Try again later.`}</Alert>}
      </Form>
    );
  }
}

export default NewChannelForm;
