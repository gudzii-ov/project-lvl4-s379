import React from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';

import { withSocket } from '../context';
import { fetchChannelsSuccess, changeChannel } from '../actions';
import NewChannelForm from './NewChannelForm';

const mapStateToProps = ({ channels, currentChannelId }) => ({ ...channels, currentChannelId });

@connect(mapStateToProps)
@withSocket
class Channels extends React.Component {
  constructor(props) {
    super(props);
    const { dispatch, socket } = this.props;
    socket.on('newChannel', (message) => {
      dispatch(fetchChannelsSuccess(message));
    });
  }

  handleClickChannel = id => () => {
    const { dispatch } = this.props;
    dispatch(changeChannel(id));
  }

  render() {
    const { allIds, byId, currentChannelId } = this.props;
    return (
      <React.Fragment>
        <h3>Channels</h3>
        <NewChannelForm />
        {
          allIds.map(id => (
            <Button
              key={id}
              variant={id === currentChannelId ? 'success' : 'light'}
              block
              onClick={this.handleClickChannel(id)}
            >
              {byId[id].name}
            </Button>
          ))
        }
      </React.Fragment>
    );
  }
}

export default Channels;
