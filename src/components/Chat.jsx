import React from 'react';
import { connect } from 'react-redux';

import Channels from './Channels';
import Messages from './Messages';
import NewMessageForm from './NewMessageForm';

const mapStateToProps = ({ currentUser }) => ({ currentUser });

const Chat = ({ currentUser }) => (
  <div className="row h-100">
    <div className="col-3">
      <Channels />
    </div>
    <div className="col h-100">
      <h3>
        {`Hello, ${currentUser}`}
      </h3>
      <div className="w-100 p-2">
        <NewMessageForm />
      </div>
      <div className="p-2 h-100 mh-100 overflow-auto border border-info">
        <Messages />
      </div>
    </div>
  </div>
);

export default connect(mapStateToProps)(Chat);
