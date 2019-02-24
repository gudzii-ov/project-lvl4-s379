import React from 'react';
import { connect } from 'react-redux';
import ListGroup from 'react-bootstrap/ListGroup';

const mapStateToProps = ({ channels }) => ({ ...channels });

@connect(mapStateToProps)
class Channels extends React.Component {
  render() {
    const { allIds, byId } = this.props;
    return (
      <React.Fragment>
        <h3>Channels</h3>
        <ListGroup>
          {
             allIds.map(id => (
               <ListGroup.Item key={id}>
                 {byId[id].name}
               </ListGroup.Item>
             ))
           }
        </ListGroup>
      </React.Fragment>
    );
  }
}

export default Channels;
