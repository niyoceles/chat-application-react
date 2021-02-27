import React from 'react';

import Chat from './components/Chats/Chats';
import { Provider } from 'react-redux';
import store from './redux/store/index';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import Users from './components/Users/Users';
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
