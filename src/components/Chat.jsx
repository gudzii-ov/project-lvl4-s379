import React from 'react';

import Channels from './Channels';
import Messages from './Messages';
import NewMessageForm from './NewMessageForm';

import UserContext from '../user-context';

const Chat = () => (
  <UserContext.Consumer>
    {
      userName => (
        <div className="row h-100">
          <div className="col-3">
            <Channels />
          </div>
          <div className="col h-100">
            <h3>
              {`Hello, ${userName}`}
            </h3>
            <div className="w-100 p-2">
              <NewMessageForm />
            </div>
            <div className="p-2 h-100 mh-100 overflow-auto border border-info">
              <Messages />
            </div>
          </div>
        </div>
      )
    }
  </UserContext.Consumer>
);

export default Chat;
