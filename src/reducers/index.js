import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { reducer as formReducer } from 'redux-form';
import * as actions from '../actions';

const channels = handleActions({
  [actions.fetchChannelsSuccess](state, { payload: { data: { attributes: channel } } }) {
    const { byId, allIds } = state;
    return {
      byId: { ...byId, [channel.id]: channel },
      allIds: [...allIds, channel.id],
    };
  },
}, { byId: {}, allIds: [] });

const messages = handleActions({
  [actions.fetchMessageSuccess](state, { payload: { data: { attributes: message } } }) {
    const { byId, allIds } = state;
    return {
      byId: { ...byId, [message.id]: message },
      allIds: [message.id, ...allIds],
    };
  },
}, { byId: {}, allIds: [] });

const currentChannelId = handleActions({
  [actions.changeChannel](state, { payload: id }) {
    return id;
  },
}, '');

export default combineReducers({
  channels,
  messages,
  currentChannelId,
  form: formReducer,
});
