import React from 'react';
import { connect } from 'react-redux';
import Alert from 'react-bootstrap/Alert';

const mapStateToProps = ({ messages, currentChannelId }) => ({ ...messages, currentChannelId });

@connect(mapStateToProps)
class Messages extends React.Component {
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
