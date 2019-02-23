import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { reducer as formReducer } from 'redux-form';
import * as actions from '../actions';

const messages = handleActions({
  [actions.addMessageSuccess](state, { payload }) {
    console.log(payload);
  },
}, {});

const channels = (state = {}) => state;
const currentChannelId = (state = '') => state;

export default combineReducers({
  channels,
  messages,
  currentChannelId,
  form: formReducer,
});
