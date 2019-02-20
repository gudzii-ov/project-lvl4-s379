import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => state;

const Chat = ({ channels, currentUser }) => (
  <div className="row h-100">
    <div className="col-3">
      <h3>Channels</h3>
      <ul className="list-group">
        {
          channels.allIds.map(id => (
            <li className="list-group-item" key={id}>
              {channels.byId[id].name}
            </li>
          ))
        }
      </ul>
    </div>
    <div className="col h-100">
      <h3>
        {`Hello, ${currentUser}`}
      </h3>
      <div className="w-100 p-2">
        <form>
          <div className="input-group mb-3">
            <input type="text" className="form-control" placeholder="message" aria-label="Message" aria-describedby="basic-addon2" />
            <div className="input-group-append">
              <button className="input-group-text" id="basic-addon2" type="submit">Send</button>
            </div>
          </div>
        </form>
      </div>
      <div className="p-2 h-100 mh-100 overflow-auto border border-info">
        <p>
          messages area
        </p>
      </div>
    </div>
  </div>
);

export default connect(mapStateToProps)(Chat);
