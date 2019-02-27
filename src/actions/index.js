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

export const removeChannelRequest = createAction('CHANNEL_REMOVE_REQUEST');
export const removeChannelSuccess = createAction('CHANNEL_REMOVE_SUCCESS');
export const removeChannelFailure = createAction('CHANNEL_REMOVE_FAILURE');

export const removeChannel = ({ channelId }) => async (dispatch) => {
  dispatch(removeChannelRequest());
  try {
    const url = routes.channelActionUrl(channelId);
    await axios.delete(url);
    dispatch(removeChannelSuccess());
  } catch (e) {
    dispatch(removeChannelFailure());
    throw (e);
  }
};

export const renameChannelRequest = createAction('CHANNEL_RENAME_REQUEST');
export const renameChannelSuccess = createAction('CHANNEL_RENAME_SUCCESS');
export const renameChannelFailure = createAction('CHANNEL_RENAME_FAILURE');

export const renameChannel = ({ channelId, name }) => async (dispatch) => {
  dispatch(renameChannelRequest());
  try {
    const url = routes.channelActionUrl(channelId);
    await axios.patch(url, { data: { attributes: { name } } });
    dispatch(renameChannelSuccess());
  } catch (e) {
    dispatch(renameChannelFailure());
    throw (e);
  }
};

export const addMessageRequest = createAction('MESSAGE_ADD_REQUEST');
export const addMessageSuccess = createAction('MESSAGE_ADD_SUCCESS');
export const addMessageFailure = createAction('MESSAGE_ADD_FAILURE');

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
export const toggleModal = (createAction('MODAL_TOGGLE'));
