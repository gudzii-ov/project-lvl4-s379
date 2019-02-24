import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Channels from './Channels';
import Messages from './Messages';
import NewMessageForm from './NewMessageForm';

import { withUser } from '../user-context';

@withUser
class Chat extends React.Component {
  render() {
    const { userName } = this.props;
    return (
      <Row>
        <Col xs="3">
          <Channels />
        </Col>
        <Col>
          <h3>
            {`Hello, ${userName}`}
          </h3>
          <div className="w-100 p-2">
            <NewMessageForm />
          </div>
          <div className="p-2 h-100 mh-100 overflow-auto border border-info">
            <Messages />
          </div>
        </Col>
      </Row>
    );
  }
}

export default Chat;
