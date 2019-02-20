import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  const props = {
    ...state.channels,
  };

  return props;
};

const Channels = ({ allIds, byId }) => (
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

export default connect(mapStateToProps)(Channels);
