import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/application.css';

import React from 'react';
import { render } from 'react-dom';
import gon from 'gon';

// import faker from 'faker';
// import cookies from 'js-cookie';
// import io from 'socket.io-client';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const Chat = ({ state: { channels } }) => (
  <div className="row h-100">
    <div className="col-3">
      <h3>Channels</h3>
      <ul className="list-group">
        {
          channels.map(({ id, name }) => (
            <li className="list-group-item" key={id}>
              {name}
            </li>
          ))
        }
      </ul>
    </div>
    <div className="col h-100">
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

const mountNode = document.getElementById('chat');
const element = (
  <Chat state={gon} />
);

render(element, mountNode);
