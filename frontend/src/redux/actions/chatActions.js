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
import { toast } from 'react-toastify';
const { REACT_APP_BACKEND } = process.env;
// Post a item
export const sendChatMessage = newItem => dispatch => {
	dispatch({ type: LOADING_UI });
	axios
		.post(`${REACT_APP_BACKEND}/item`, newItem)
		.then(res => {
			dispatch({
				type: ADD_CHAT,
				payload: res.data,
			});
			toast.success(res.data.message);
			// dispatch(clearErrors());
		})
		.catch(err => {
			dispatch({
				type: SET_ERRORS,
				payload: err.response ? err.response.data.error : null,
			});
		});
};

export const getMyChats = () => dispatch => {
	const data = {
		sender: 'waceles',
		receiver: 'test2',
	};
	axios
		.post(`${REACT_APP_BACKEND}/message`, data, {
			headers: {
				'Access-Control-Allow-Origin': '*',
				'X-Requested-With': 'XMLHttpRequest',
				'Content-Type': 'application/json',
				'Access-Control-Allow-Credentials': true,
				'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT',
				'Access-Control-Allow-Headers':
					'Content-Type, Accept, Authorization, authorization',
			},
		})
		.then(res => {
			console.log('ZZZZZZZZZZZZ', res.data);
			dispatch({ type: GET_ALL_CHATS_SUCCESS, payload: res.data });
		})
		.catch(err => {
			console.log('ZZZZZZppppp', err);
			dispatch({
				type: GET_ALL_CHATS_FAILURE,
				payload: err.response ? err.response.data.error : null,
			});
		});
};

export const getUsers = () => dispatch => {
	const account = {
		username: 'test2',
		token:
			'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQsInVzZXJuYW1lIjoid2FjZWxlcyIsInBhc3N3b3JkIjoiJDJhJDEwJFB1ODR3Tm5BWXpzR25iUEF2eHMuYi41QU5XVzZHeXE4cVluT1BDck4ySlF4WXRudXlmSHVpIiwiaWF0IjoxNjE0NDEwODI2LCJleHAiOjE2MTQ0OTcyMjZ9.3fV3eJQMyMQ05qBme08xszvl8RG6Mln1IqE1PFBrM20',
	};
	axios
		.get(`${REACT_APP_BACKEND}/users`)
		.then(res => {
			console.log('eeeeeeeeeee', res.data);
			dispatch({ type: GET_ALL_USERS_SUCCESS, payload: res.data });
		})
		.catch(err => {
			dispatch({
				type: GET_ALL_USERS_FAILURE,
				payload: err.response ? err.response.data.error : null,
			});
		});
};
