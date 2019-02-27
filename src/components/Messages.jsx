import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import Alert from 'react-bootstrap/Alert';

import * as actions from '../actions';
import { withSocket } from '../context';

const mapStateToProps = ({ messages, currentChannelId }) => {
  const { byId, allIds } = messages;
  const filteredAllIds = allIds.filter(id => byId[id].channelId === currentChannelId);
  const filteredById = _.pick(byId, filteredAllIds);
  return {
    byId: filteredById,
    allIds: filteredAllIds,
    currentChannelId,
  };
};

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
    const { byId, allIds } = this.props;
    return (
      allIds
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
