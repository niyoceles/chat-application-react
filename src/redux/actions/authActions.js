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
	dispatch({ type: LOGIN_REQUEST, payload: loginData });
	axios
		.post(`${REACT_APP_BACKEND}/users/login`, loginData)
		.then(res => {
			setAuthorization(res.data);
			dispatch({ type: LOGIN_SUCCESS, payload: res.data });
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
			console.log('dddd', err.response.data.message);
			dispatch({
				type: REGISTER_FAILURE,
				payload: err.response
					? err.response.data.error ||
					  err.response.data.errors[0].message ||
					  err.response.data.message
					: null,
			});
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
	// set logout on backend later
	localStorage.removeItem('IdToken');
	localStorage.removeItem('userInfo');
	delete axios.defaults.headers.common['Authorization'];
	dispatch({ type: SET_UNAUTHENTICATED });
};
