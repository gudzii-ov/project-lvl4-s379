import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = ({ channels }) => ({ ...channels });

@connect(mapStateToProps)
class Channels extends React.Component {
  render() {
    const { allIds, byId } = this.props;
    return (
      <React.Fragment>
        <h3>Channels</h3>
        <ul className="list-group">
          {
         allIds.map(id => (
           <li className="list-group-item" key={id}>
             {byId[id].name}
           </li>
         ))
       }
        </ul>
      </React.Fragment>
    );
  }
}

export default Channels;
