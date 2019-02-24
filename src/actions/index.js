import axios from 'axios';
import { createAction } from 'redux-actions';
import routes from '../routes';

// export const fetchMessageRequest = createAction('MESSAGE_FETCH_REQUEST');
export const fetchMessageSuccess = createAction('MESSAGE_FETCH_SUCCESS');
// export const fetchMessageFailure = createAction('MESSAGE_FETCH_FAILURE');

export const fetchMessageSocket = socket => (dispatch) => {
  // dispatch(fetchMessageRequest());
  socket.on('newMessage', (message) => {
    dispatch(fetchMessageSuccess(message));
  });
};

export const addMessageRequest = ({ message, channelId }) => async () => {
  const url = routes.messagesUrl(channelId);
  await axios.post(url, { data: { attributes: { ...message } } });
  // dispatch(addMessageSuccess({ message: response.data.data.attributes }));
};
