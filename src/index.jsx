import React from 'react';
import { render } from 'react-dom';
import gon from 'gon';
import faker from 'faker';
import cookies from 'js-cookie';
// import io from 'socket.io-client';
import Chat from './chat';

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

const mountNode = document.getElementById('chat');
const element = (
  <Chat state={gon} username={username} />
);

render(element, mountNode);
