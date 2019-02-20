import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = ({ messages }) => ({ messages });

const NewMessageForm = () => (
  <form>
    <div className="input-group mb-3">
      <input type="text" className="form-control" placeholder="message" aria-label="Message" aria-describedby="basic-addon2" />
      <div className="input-group-append">
        <button className="input-group-text" id="basic-addon2" type="submit">Send</button>
      </div>
    </div>
  </form>
);

export default connect(mapStateToProps)(NewMessageForm);
