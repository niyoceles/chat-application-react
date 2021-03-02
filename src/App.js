import React from 'react';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import Chat from './components/Chats/Chats';
import { Provider } from 'react-redux';
import store from './redux/store/index';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import Users from './components/Users/Users';

import { LOGIN_SUCCESS, SET_AUTHENTICATED } from '../src/redux/types';
import { logoutUser } from '../src/redux/actions';

const token = localStorage.IdToken;
if (token) {
	const decodedToken = jwtDecode(token);
	if (decodedToken.exp * 1000 < Date.now()) {
		store.dispatch(logoutUser());
		window.location.href = '/';
	} else {
		store.dispatch({ type: SET_AUTHENTICATED });
		store.dispatch({
			type: LOGIN_SUCCESS,
			payload: { ...decodedToken, token },
		});
		axios.defaults.headers.common['Authorization'] = token;
	}
}

const App = () => {
	return (
		<Provider store={store}>
			<Router>
				<Route path='/' exact component={Login} />
				<Route path='/signup' exact component={Signup} />
				<Route path='/users' exact component={Users} />
				<Route path='/chat/:username' component={Chat} />
			</Router>
		</Provider>
	);
};

export default App;
