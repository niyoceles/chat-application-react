import '@babel/polyfill';
import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import promiseMiddleware from 'redux-promise-middleware';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import Signup from '../../../components/Auth/Signup';

import { useSelector, useDispatch } from 'react-redux';

const middlewares = [thunk, promiseMiddleware];
const mockStore = configureMockStore(middlewares);
const store = mockStore({});

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
	useSelector: jest.fn(),
	useDispatch: () => mockDispatch,
}));

describe.skip('testing Signup ||| component', () => {
	test('should render Signup component', () => {
		const props = {
			createAccount: jest.fn(),
			signupSuccess: {},
			signupFailure: {},
		};
		const mockedDispatch = jest.fn();
		useSelector.mockImplementation(selectorFn => selectorFn('dddd'));
		useDispatch.mockReturnValue(mockedDispatch);

		const wrapper = shallow(<Signup {...props} />);
		expect(wrapper).toHaveLength(1);
	});
});

describe.skip('Render class', () => {
	it('to have wrapper submit button', async () => {
		const wrapper = mount(
			<MemoryRouter>
				<Provider store={store}>
					<Signup />
				</Provider>
			</MemoryRouter>
		);
		const form = wrapper.find('.signup-form');
		const inputs = wrapper.find('.signup-form input');

		const correctInputs = {
			username: 'abcde',
			password: '@Password11',
			confirmPassword: '@Password11',
		};

		inputs.map(input =>
			input.simulate('change', {
				name: input.instance().name,
				value: correctInputs[input.instance().name],
			})
		);

		form.simulate('submit', { preventDefault: jest.fn() });
		expect(form.length).toBe(1);
	});
});
