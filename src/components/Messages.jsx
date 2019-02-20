import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = ({ messages }) => ({ messages });

// const Messages = ({ allIds, byId }) => (
const Messages = () => (
  <p>
    messages area 2
  </p>
);

export default connect(mapStateToProps)(Messages);
