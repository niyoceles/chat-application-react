import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import promiseMiddleware from 'redux-promise-middleware';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import Logout from '../../../components/Auth/Logout';

const middlewares = [thunk, promiseMiddleware];
const mockStore = configureMockStore(middlewares);
const store = mockStore({});

describe('testing Logout component', () => {
	test('should render Logout component', () => {
		const wrapper = shallow(
			<Provider store={store}>
				<Logout />
			</Provider>
		);
		expect(wrapper).toHaveLength(1);
	});
});
