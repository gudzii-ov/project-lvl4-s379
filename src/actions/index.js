import axios from 'axios';
import { createAction } from 'redux-actions';
import routes from '../routes';

export const addChannelRequest = createAction('CHANNEL_ADD_REQUEST');
export const addChannelSuccess = createAction('CHANNEL_ADD_SUCCESS');
export const addChannelFailure = createAction('CHANNEL_ADD_FAILURE');

export const addChannel = ({ channel }) => async (dispatch) => {
  dispatch(addChannelRequest());
  const url = routes.channelsUrl();
  try {
    await axios.post(url, { data: { attributes: { ...channel } } });
    dispatch(addChannelSuccess());
  } catch (e) {
    dispatch(addChannelFailure());
    throw (e);
  }
};

export const changeChannel = createAction('CHANNEL_CHANGE');

export const removeChannelRequest = ({ channelId }) => async () => {
  const url = routes.channelActionUrl(channelId);
  await axios.delete(url);
};

export const renameChannelRequest = ({ channelId, name }) => async () => {
  const url = routes.channelActionUrl(channelId);
  await axios.patch(url, { data: { attributes: { name } } });
};

export const addMessage = ({ message, channelId }) => async () => {
  const url = routes.messagesUrl(channelId);
  await axios.post(url, { data: { attributes: { ...message } } });
};

export const addChannelSocket = createAction('CHANNEL_ADD_SOCKET');
export const renameChannelSocket = createAction('CHANNEL_RENAME_SOCKET');
export const removeChannelSocket = createAction('CHANNEL_REMOVE_SOCKET');
export const addMessageSocket = createAction('MESSAGE_FETCH_SUCCESS_SOCKET');

export const setModal = createAction('MODAL_SET');
export const toggleModalUIState = createAction('MODAL_UI_STATE_TOGGLE');
