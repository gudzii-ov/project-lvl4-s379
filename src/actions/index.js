import axios from 'axios';
import { createAction } from 'redux-actions';
import routes from '../routes';

export const fetchMessageSuccess = createAction('MESSAGE_FETCH_SUCCESS');
export const fetchChannelsSuccess = createAction('CHANNELS_FETCH_SUCCESS');

export const addMessageRequest = ({ message, channelId }) => async () => {
  const url = routes.messagesUrl(channelId);
  await axios.post(url, { data: { attributes: { ...message } } });
};

export const changeChannel = createAction('CHANNEL_CHANGE');

export const addChannelRequest = ({ channel }) => async () => {
  const url = routes.channelsUrl();
  await axios.post(url, { data: { attributes: { ...channel } } });
};

export const removeChannelRequest = ({ channelId }) => async () => {
  const url = routes.channelRemoveUrl(channelId);
  await axios.delete(url);
};

export const removeChannel = createAction('CHANNEL_REMOVE');
export const removeMessages = createAction('MESSAGES_REMOVE');

export const toggleModalUIState = createAction('MODAL_UI_STATE_TOGGLE');
export const setChannelForRemoval = createAction('CHANNEL_FOR_REMOVAL_SET');
