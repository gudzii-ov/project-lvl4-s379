import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { reducer as formReducer } from 'redux-form';
import * as actions from '../actions';

const messages = handleActions({
  [actions.fetchMessageSuccess](state, { payload: { data: { attributes: message } } }) {
    const { byId, allIds } = state;
    return {
      byId: { ...byId, [message.id]: message },
      allIds: [message.id, ...allIds],
    };
  },
}, { byId: {}, allIds: [] });

const channels = (state = {}) => state;
// const messages = (state = {}) => state;
const currentChannelId = (state = '') => state;

export default combineReducers({
  channels,
  messages,
  currentChannelId,
  form: formReducer,
});
