import 'dotenv/config';
import {
	REGISTER_REQUEST,
	REGISTER_SUCCESS,
	REGISTER_FAILURE,
	LOGIN_REQUEST,
	LOGIN_SUCCESS,
	LOGIN_FAILURE,
	SET_UNAUTHENTICATED,
} from '../types';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

const { REACT_APP_BACKEND } = process.env;

export const loginUser = loginData => dispatch => {
	// dispatch({ type: LOADING_UI });
	console.log('HHHHHHH', loginData);
	dispatch({ type: LOGIN_REQUEST, payload: loginData });
	axios
		.post(`${REACT_APP_BACKEND}/users/login`, loginData, {
			proxy: {
				host: 'localhost',
				port: 3000,
			},
		})
		.then(res => {
			console.log('RRRRR', res.data);
			setAuthorization(res.data.token);
			dispatch({ type: LOGIN_SUCCESS, payload: res.data });
		})
		.catch(err => {
			console.log('RRRRRzzz', err ? err : null);
			dispatch({
				type: LOGIN_FAILURE,
				payload: err.response ? err.response.data.error : null,
			});
		});
};

export const signupUser = newUserData => dispatch => {
	dispatch({ type: REGISTER_REQUEST, payload: newUserData });
	axios
		.post(`${REACT_APP_BACKEND}/user`, newUserData)
		.then(res => {
			setAuthorization(res.data.token);
			dispatch({ type: REGISTER_SUCCESS, payload: res.data.message });
		})
		.catch(err => {
			dispatch({ type: REGISTER_FAILURE, payload: err.response.data.error });
		});
};

export const setAuthorization = token => {
	const IdToken = `Bearer ${token}`;
	const userInfo = jwtDecode(token);
	localStorage.setItem('IdToken', IdToken);
	localStorage.setItem('userInfo', JSON.stringify(userInfo));
	//seting authorization to the header axios
	axios.defaults.headers.common['Authorization'] = IdToken;
};

export const logoutUser = () => dispatch => {
	// set logout on backend later
	localStorage.removeItem('IdToken');
	localStorage.removeItem('userInfo');
	delete axios.defaults.headers.common['Authorization'];
	dispatch({ type: SET_UNAUTHENTICATED });
};
