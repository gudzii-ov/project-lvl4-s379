import React from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

import * as actions from '../actions';
import NewChannelForm from './NewChannelForm';
import CommonModal from './CommonModal';
import FormModal from './FormModal';

const mapStateToProps = ({ channels, currentChannelId }) => ({ ...channels, currentChannelId });

const actionCreators = {
  changeChannel: actions.changeChannel,
  removeChannel: actions.removeChannel,
  renameChannel: actions.renameChannel,
  toggleModal: actions.toggleModal,
};

@connect(mapStateToProps, actionCreators)
class Channels extends React.Component {
  handleClickChannel = id => () => {
    const { changeChannel } = this.props;
    changeChannel(id);
  }

  handleClickRemoval = channelId => () => {
    const { removeChannel, toggleModal } = this.props;
    const modalState = {
      modalHeader: 'Remove channel',
      modalBody: 'Are you want to remove channel?',
      modalAction: () => {
        removeChannel({ channelId });
      },
    };
    toggleModal({ attributes: modalState, modalType: 'common' });
  }

  handleClickEdit = channelId => () => {
    const { renameChannel, toggleModal } = this.props;
    const modalState = {
      modalHeader: 'Rename channel',
      modalAction: ({ name }) => {
        renameChannel({ name, channelId });
      },
    };
    toggleModal({ attributes: modalState, modalType: 'form' });
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
