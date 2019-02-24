import React from 'react';
import { connect } from 'react-redux';
import Alert from 'react-bootstrap/Alert';

import * as actions from '../actions';
import { withSocket } from '../context';

const mapStateToProps = ({ messages, currentChannelId }) => ({ ...messages, currentChannelId });

@connect(mapStateToProps)
@withSocket
class Messages extends React.Component {
  constructor(props) {
    super(props);
    const { dispatch, socket } = this.props;
    socket.on('removeChannel', (message) => {
      dispatch(actions.removeMessages(message));
    });
  }

  render() {
    const { byId, allIds, currentChannelId } = this.props;
    return (
      allIds
        .filter(id => byId[id].channelId === currentChannelId)
        .map((id) => {
          const { user, text } = byId[id];
          return (
            <Alert variant="primary" key={id}>
              {`${user} said: ${text}`}
            </Alert>
          );
        })
    );
  }
}

export default Messages;
