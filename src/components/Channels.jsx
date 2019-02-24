import React from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';

const mapStateToProps = ({ channels, currentChannelId }) => ({ ...channels, currentChannelId });

@connect(mapStateToProps)
class Channels extends React.Component {
  render() {
    const { allIds, byId, currentChannelId } = this.props;
    return (
      <React.Fragment>
        <h3>Channels</h3>
        {
          allIds.map(id => (
            <Button
              key={id}
              variant={id === currentChannelId ? 'success' : 'light'}
              block
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
