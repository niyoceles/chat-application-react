/* eslint-disable import/no-anonymous-default-export */
import {
	REGISTER_REQUEST,
	REGISTER_SUCCESS,
	REGISTER_FAILURE,
	LOGIN_REQUEST,
	LOGIN_SUCCESS,
	LOGIN_FAILURE,
	SET_AUTHENTICATED,
	SET_UNAUTHENTICATED,
} from '../types';
import jwtDecode from 'jwt-decode';

const initialState = {
	signupData: null,
	loginData: null,
	loginSuccess: null,
	loginFailure: null,
	signupFailure: null,
	signupSuccess: null,
	authenticated: false,
	credentials: {},
	user: {}
};

export default function (state = initialState, action) {
	switch (action.type) {
		case REGISTER_REQUEST:
			return {
				...state,
				signupData: action.payload,
			};
		case REGISTER_SUCCESS:
			return {
				...state,
				signupSuccess: action.payload,
				signupFailure: null,
				signupData: null,
			};
		case REGISTER_FAILURE:
			return {
				...state,
				signupFailure: action.payload,
				signupSuccess: null,
				signupData: null,
			};
		case LOGIN_REQUEST:
			return {
				...state,
				loginData: action.payload,
			};
		case LOGIN_SUCCESS:
			return {
				...state,
				loginSuccess: action.payload.message,
				loginFailure: null,
				loginData: null,
				authenticated: true,
				user: {...state.user, ...jwtDecode(action.payload.User.token)}
			};
		case LOGIN_FAILURE:
			return {
				...state,
				loginFailure: action.payload,
				loginSuccess: null,
				loginData: null,
			};
		case SET_AUTHENTICATED:
			return {
				...state,
				authenticated: true,
			};
		case SET_UNAUTHENTICATED:
			return initialState;
		default:
			return state; //or return initialState
	}
}
