import React from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

import { withSocket } from '../context';
import * as actions from '../actions';
import NewChannelForm from './NewChannelForm';
import ConfirmRemovingModal from './CofirmRemovingModal';

const mapStateToProps = ({ channels, currentChannelId }) => ({ ...channels, currentChannelId });

@connect(mapStateToProps)
@withSocket
class Channels extends React.Component {
  constructor(props) {
    super(props);
    const { dispatch, socket } = this.props;
    socket.on('newChannel', (message) => {
      dispatch(actions.fetchChannelsSuccess(message));
    });
    socket.on('removeChannel', (message) => {
      dispatch(actions.removeChannel(message));
    });
  }

  handleClickChannel = id => () => {
    const { dispatch } = this.props;
    dispatch(actions.changeChannel(id));
  }

  handleClickRemoval = id => () => {
    const { dispatch } = this.props;
    dispatch(actions.toggleModalUIState());
    dispatch(actions.setChannelForRemoval(id));
  }

  render() {
    const { allIds, byId, currentChannelId } = this.props;
    return (
      <React.Fragment>
        <h3>Channels</h3>
        <NewChannelForm />
        {
          allIds.map(id => (
            <ButtonToolbar key={id}>
              <ButtonGroup>
                <Button
                  key={id}
                  className="justify-content-between"
                  variant={id === currentChannelId ? 'success' : 'light'}
                  block
                  onClick={this.handleClickChannel(id)}
                >
                  {byId[id].name}
                </Button>
                {byId[id].removable
                  ? (
                    <Button variant="info" onClick={this.handleClickRemoval(id)}>
                      -
                    </Button>
                  ) : null
                }

              </ButtonGroup>
            </ButtonToolbar>
          ))
        }
        <ConfirmRemovingModal />
      </React.Fragment>
    );
  }
}

export default Channels;
