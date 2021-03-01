import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import promiseMiddleware from 'redux-promise-middleware';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import Users from '../../../components/Users/Users';

const middlewares = [thunk, promiseMiddleware];
const mockStore = configureMockStore(middlewares);
const store = mockStore({});

describe('testing Users component', () => {
	test('should render Users component', () => {
		const wrapper = shallow(
			<Provider store={store}>
				<Users />
			</Provider>
		);
		expect(wrapper).toHaveLength(1);
	});
});
