import faker from 'faker';
import cookies from 'js-cookie';
import gon from 'gon';
// import io from 'socket.io-client';

import React from 'react';
import { render } from 'react-dom';
// import { createStore } from 'redux';

import Chat from './components/Chat';
// import store from './store';
// import reducers from './reducers';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/application.css';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const getUser = () => {
  faker.locale = 'en';
  let username;
  const cookiename = cookies.get('username');
  if (cookiename === undefined) {
    username = faker.internet.userName();
    cookies.set('username', username, { expires: 365 });
  } else {
    username = cookiename;
  }

  return username;
};

const username = getUser();

const element = (
  <Chat state={gon} username={username} />
);

render(
  element,
  document.getElementById('chat'),
);
