import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import promiseMiddleware from 'redux-promise-middleware';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import Chats from '../../../components/Chats/Chats';

const middlewares = [thunk, promiseMiddleware];
const mockStore = configureMockStore(middlewares);
const store = mockStore({});

describe('testing Chats component', () => {
	test('should render Chats component', () => {
		const wrapper = shallow(
			<Provider store={store}>
				<Chats />
			</Provider>
		);
		expect(wrapper).toHaveLength(1);
	});
});
