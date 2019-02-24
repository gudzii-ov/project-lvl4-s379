import '@babel/polyfill';
import gon from 'gon';
import { normalize, schema } from 'normalizr';
import faker from 'faker';
import cookies from 'js-cookie';
import _ from 'lodash';

import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux'; // TODO: replace Provider with decorator

import Chat from './components/Chat';
import reducers from './reducers';
import UserContext from './user-context';

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
    cookies.set('username', username, { expires: 1 });
  } else {
    username = cookiename;
  }

  return username;
};

const username = getUser();

// Prepare initial state from gon data
const message = new schema.Entity('messages');
const channel = new schema.Entity('channels');
const gonSchema = {
  channels: [channel],
  messages: [message],
};
const normalizedGon = normalize(gon, gonSchema);

const initialState = {
  channels: {
    byId: normalizedGon.entities.channels,
    allIds: normalizedGon.result.channels,
  },
  messages: {
    byId: normalizedGon.entities.messages || {},
    allIds: _.reverse(normalizedGon.result.messages),
  },
  currentChannelId: normalizedGon.result.currentChannelId,
};
// End prepare

/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducers,
  initialState,
  composeEnhancers(
    applyMiddleware(thunk),
  ),
);
/* eslint-enable */

const element = (
  <Provider store={store}>
    <UserContext.Provider value={username}>
      <Chat />
    </UserContext.Provider>
  </Provider>
);

render(
  element,
  document.getElementById('chat'),
);
