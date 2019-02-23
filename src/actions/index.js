import axios from 'axios';
import { createAction } from 'redux-actions';

export const addMessageSuccess = createAction('MESSAGE_ADD_SUCCESS');
export const addMessageRequest = ({ message }) => async (dispatch) => {
  const url = '/channels';
  const response = await axios.post(url, { message });
  dispatch.addMessageSuccess({ message: response.data });
};
