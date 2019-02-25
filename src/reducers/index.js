import _ from 'lodash';
import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { reducer as formReducer } from 'redux-form';
import * as actions from '../actions';

const channels = handleActions({
  [actions.addChannel](state, { payload: { data: { attributes: channel } } }) {
    const { byId, allIds } = state;
    return {
      byId: { ...byId, [channel.id]: channel },
      allIds: [...allIds, channel.id],
    };
  },
  [actions.removeChannel](state, { payload: { data: { id } } }) {
    const { byId, allIds } = state;
    return {
      byId: _.omitBy(byId, channel => channel.id === id),
      allIds: allIds.filter(cId => cId !== id),
    };
  },
}, { byId: {}, allIds: [] });

const messages = handleActions({
  [actions.addMessage](state, { payload: { data: { attributes: message } } }) {
    const { byId, allIds } = state;
    return {
      byId: { ...byId, [message.id]: message },
      allIds: [message.id, ...allIds],
    };
  },
  [actions.removeMessages](state, { payload: { data: { id } } }) {
    const { byId } = state;
    const newById = _.omitBy(byId, message => message.channelId === id);
    const newAllIds = _.reverse(_.keys(newById)).map(key => Number(key));
    return {
      byId: newById,
      allIds: newAllIds,
    };
  },
}, { byId: {}, allIds: [] });

const currentChannelId = handleActions({
  [actions.changeChannel](state, { payload: id }) {
    return id;
  },
  [actions.removeChannel](state, { payload: { data: { id } } }) {
    return state === id ? 1 : state;
  },
}, '');

const modalState = handleActions({
  [actions.setModal](state, { payload: { attributes } }) {
    return { ...attributes };
  },
}, {});

const modalUIState = handleActions({
  [actions.toggleModalUIState](state) {
    return { show: !state.show };
  },
}, { show: false });

export default combineReducers({
  channels,
  messages,
  currentChannelId,
  modalState,
  modalUIState,
  form: formReducer,
});
