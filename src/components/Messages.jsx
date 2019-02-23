import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = ({ messages }) => ({ ...messages });

const Messages = ({ byId, allIds }) => (
  allIds.map((id) => {
    const { user, text } = byId[id];
    return (
      <div className="alert alert-light border rounded" role="alert" key={id}>
        {`${user} said: ${text}`}
      </div>
    );
  })
);

export default connect(mapStateToProps)(Messages);
