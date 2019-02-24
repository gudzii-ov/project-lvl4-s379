import axios from 'axios';
import { createAction } from 'redux-actions';
import routes from '../routes';

export const fetchMessageSuccess = createAction('MESSAGE_FETCH_SUCCESS');

export const addMessageRequest = ({ message, channelId }) => async () => {
  const url = routes.messagesUrl(channelId);
  await axios.post(url, { data: { attributes: { ...message } } });
};
