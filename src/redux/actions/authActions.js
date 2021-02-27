import 'dotenv/config';
import {
	REGISTER_REQUEST,
	REGISTER_SUCCESS,
	REGISTER_FAILURE,
	LOGIN_REQUEST,
	LOGIN_SUCCESS,
	LOGIN_FAILURE,
	SET_UNAUTHENTICATED,
	LOADING_UI,
	STOP_LOADING_UI
} from '../types';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

const { REACT_APP_BACKEND } = process.env;

export const loginUser = loginData => dispatch => {
	dispatch({ type: LOADING_UI });
	dispatch({ type: LOGIN_REQUEST, payload: loginData });
	axios
		.post(`${REACT_APP_BACKEND}/users/login`, loginData)
		.then(res => {
			setAuthorization(res.data);
			dispatch({ type: LOGIN_SUCCESS, payload: res.data });
			dispatch({ type: STOP_LOADING_UI })
		})
		.catch(err => {
			dispatch({
				type: LOGIN_FAILURE,
				payload: err.response ? err.response.data.error : null,
			});
		});
};

export const signupUser = signupData => dispatch => {
	dispatch({ type: REGISTER_REQUEST, payload: signupData });
	axios
		.post(`${REACT_APP_BACKEND}/users`, signupData)
		.then(res => {
			setAuthorization(res.data);
			dispatch({ type: REGISTER_SUCCESS, payload: res.data.message });
		})
		.catch(err => {
			dispatch({ type: REGISTER_FAILURE, payload: err.response });
		});
};

export const setAuthorization = data => {
	const IdToken = `Bearer ${data.token}`;
	const userInfo = jwtDecode(data.token);
	localStorage.setItem('IdToken', IdToken);
	localStorage.setItem('userInfo', JSON.stringify(userInfo));
	//seting authorization to the header axios
	axios.defaults.headers.common['Authorization'] = IdToken;
};

export const logoutUser = () => dispatch => {
	console.log('LOGOUT');
	// set logout on backend later
	localStorage.removeItem('IdToken');
	localStorage.removeItem('userInfo');
	delete axios.defaults.headers.common['Authorization'];
	dispatch({ type: SET_UNAUTHENTICATED });
};
