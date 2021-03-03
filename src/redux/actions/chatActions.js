import 'dotenv/config';
import {
	SET_ERRORS,
	ADD_CHAT,
	LOADING_UI,
	GET_ALL_CHATS_FAILURE,
	GET_ALL_CHATS_SUCCESS,
	GET_ALL_USERS_FAILURE,
	GET_ALL_USERS_SUCCESS,
} from '../types';
import axios from 'axios';
const { REACT_APP_BACKEND } = process.env;

axios.defaults.headers.common['Authorization'] =
	localStorage.getItem('IdToken') || null;

// Post a message
export const sendChatMessage = newMessage => dispatch => {
	dispatch({ type: LOADING_UI });
	axios
		.post(`${REACT_APP_BACKEND}/message`, newMessage)
		.then(res => {
			dispatch({ type: ADD_CHAT, payload: res.data });
		})
		.catch(err => {
			dispatch({
				type: SET_ERRORS,
				payload: err.response ? err.response.data.error : null,
			});
		});
};

export const getMyChats = myMessages => dispatch => {
	axios
		.post(`${REACT_APP_BACKEND}/messages`, myMessages)
		.then(res => {
			dispatch({ type: GET_ALL_CHATS_SUCCESS, payload: res.data });
		})
		.catch(err => {
			dispatch({
				type: GET_ALL_CHATS_FAILURE,
				payload: err.response ? err.response.data.error : null,
			});
		});
};

export const getUsers = () => dispatch => {
	axios
		.get(`${REACT_APP_BACKEND}/users`)
		.then(res => {
			dispatch({ type: GET_ALL_USERS_SUCCESS, payload: res.data });
		})
		.catch(err => {
			dispatch({
				type: GET_ALL_USERS_FAILURE,
				payload: err.response ? err.response.data.error : null,
			});
		});
};
