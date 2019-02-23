import axios from 'axios';
import { createAction } from 'redux-actions';

export const addMessageSuccess = createAction('MESSAGE_ADD_SUCCESS');
export const addMessageRequest = ({ message }) => async (dispatch) => {
  const url = '/api/v1/channels/1/messages/';
  const response = await axios.post(url, { data: { attributes: { ...message } } });
  dispatch(addMessageSuccess({ message: response.data.data.attributes }));
};
