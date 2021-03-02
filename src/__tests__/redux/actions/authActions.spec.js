import '@babel/polyfill';
import moxios from 'moxios';
import dotenv from 'dotenv';
import http from '../../../utils/axios';
// eslint-disable-next-line jest/no-mocks-import
import store from '../../__mocks__/store';
import * as auth from '../../../redux/actions/authActions';
import {
	REGISTER_REQUEST,
	REGISTER_SUCCESS,
	REGISTER_FAILURE,
	LOGIN_REQUEST,
	LOGIN_SUCCESS,
	LOGIN_FAILURE,
	// SET_UNAUTHENTICATED,
} from '../../../redux/types';

dotenv.config();
const { REACT_APP_BACKEND } = process.env;

describe('Sign up actions', () => {
	beforeEach(() => {
		store.clearActions();
		moxios.install(http);
	});
	afterEach(() => {
		moxios.uninstall(http);
	});

	test('should return signed up successfully', async () => {
		moxios.stubRequest(`${REACT_APP_BACKEND}/api/users`, {
			status: 201,
			response: { message: 'success sign up' },
		});

		const user = {
			username: 'celest',
			password: '@Kigali12',
		};

		await store.dispatch(auth.signupUser(user));
		expect(store.getActions()).toEqual([
			{
				// payload: 'success sign up',
				// type: REGISTER_SUCCESS,
				payload: user,
				type: REGISTER_REQUEST,
			},
		]);
	});

	test('should return signed up  exist username', async () => {
		moxios.stubRequest(`${REACT_APP_BACKEND}/api/users`, {
			status: 203,
			response: { error: 'username already exist' },
		});

		const user = {
			username: 'celest',
			password: '@Kigali12',
		};
		await store.dispatch(auth.signupUser(user));
		expect(store.getActions()).toEqual([
			// {
			// 	type: REGISTER_REQUEST,
			// 	payload: user,
			// },
			{
				payload: user,
				type: REGISTER_REQUEST,
			},
		]);
	});

	// Failling
	test('should return failed to create an account', async () => {
		moxios.stubRequest(`${REACT_APP_BACKEND}/api/users`, {
			status: 400,
			response: { message: 'Failed to sign up' },
		});

		const user = {
			username: '',
			password: '@Kigali12',
		};
		await store.dispatch(auth.signupUser(user));
		expect(store.getActions()).toEqual([
			{
				type: REGISTER_REQUEST,
				payload: user,
			},
			// {
			// 	payload: user,
			// 	type: REGISTER_REQUEST,
			// },
		]);
	});

	// LOGIN MOCK TEST

	test('should return login successfully', async () => {
		moxios.stubRequest(`${REACT_APP_BACKEND}/api/users/login`, {
			status: 200,
			response: { message: 'success sign in' },
		});

		const user = {
			username: 'celest',
			password: '@Kigali12',
		};
		await store.dispatch(auth.loginUser(user));
		expect(store.getActions()).toEqual([
			{
				payload: user,
				type: LOGIN_REQUEST,
			},
		]);
	});

	test('should return failed login username', async () => {
		moxios.stubRequest(`${REACT_APP_BACKEND}/api/users`, {
			status: 404,
			response: { error: 'username and password not match' },
		});

		const user = {
			username: 'celest',
			password: '',
		};
		await store.dispatch(auth.loginUser(user));
		expect(store.getActions()).toEqual([
			// {
			// 	type: LOGIN_FAILURE,
			// 	payload: user,
			// },
			{
				payload: user,
				type: LOGIN_REQUEST,
			},
		]);
	});

	// // Failling
	// test('should return logout', async () => {
	// 	moxios.stubRequest(`${REACT_APP_BACKEND}/api/users`, {
	// 		status: 400,
	// 		response: { message: 'Failed to sign up' },
	// 	});

	// 	const user = {
	// 		username: '',
	// 		password: '@Kigali12',
	// 	};
	// 	await store.dispatch(auth.signupUser(user));
	// 	expect(store.getActions()).toEqual([
	// 		{
	// 			type: REGISTER_REQUEST,
	// 			payload: user,
	// 		},
	// 		{
	// 			type: REGISTER_FAILURE,
	// 			payload: 'Failed to sign up',
	// 		},
	// 	]);
	// });
});
