import React from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

import { withSocket } from '../context';
import * as actions from '../actions';
import NewChannelForm from './NewChannelForm';
import CommonModal from './CommonModal';
import FormModal from './FormModal';

const mapStateToProps = ({ channels, currentChannelId }) => ({ ...channels, currentChannelId });

@connect(mapStateToProps)
@withSocket
class Channels extends React.Component {
  constructor(props) {
    super(props);
    const { dispatch, socket } = this.props;
    socket.on('newChannel', (message) => {
      dispatch(actions.addChannel(message));
    });
    socket.on('removeChannel', (message) => {
      dispatch(actions.removeChannel(message));
    });
    socket.on('renameChannel', (message) => {
      dispatch(actions.renameChannel(message));
    });
  }

  handleClickChannel = id => () => {
    const { dispatch } = this.props;
    dispatch(actions.changeChannel(id));
  }

  handleClickRemoval = channelId => () => {
    const { dispatch } = this.props;
    const modalState = {
      modalHeader: 'Remove channel',
      modalBody: 'Are you want to remove channel?',
      modalAction: () => {
        dispatch(actions.removeChannelRequest({ channelId }));
      },
    };
    dispatch(actions.setModal({ attributes: modalState }));
    dispatch(actions.toggleModalUIState({ wichModal: 'common' }));
  }

  handleClickEdit = channelId => () => {
    const { dispatch } = this.props;
    const modalState = {
      modalHeader: 'Rename channel',
      modalAction: ({ name }) => {
        dispatch(actions.renameChannelRequest({ name, channelId }));
      },
    };
    dispatch(actions.setModal({ attributes: modalState }));
    dispatch(actions.toggleModalUIState({ wichModal: 'form' }));
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
                    <React.Fragment>
                      <Button variant="dark" onClick={this.handleClickEdit(id)}>
                        Edit
                      </Button>
                      <Button variant="info" onClick={this.handleClickRemoval(id)}>
                        -
                      </Button>
                    </React.Fragment>
                  ) : null
                }
              </ButtonGroup>
            </ButtonToolbar>
          ))
        }
        <CommonModal />
        <FormModal />
      </React.Fragment>
    );
  }
}

export default Channels;
