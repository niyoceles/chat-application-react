import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import promiseMiddleware from 'redux-promise-middleware';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import Login from '../../../components/Auth/Login';

const middlewares = [thunk, promiseMiddleware];
const mockStore = configureMockStore(middlewares);
const store = mockStore({});

// describe('testing Login component', () => {
// 	test('should render Login component', () => {
// 		const props = {
// 			handleSubmit: jest.fn(),
// 			// displayError: jest.fn(),
// 			// clearErrors: jest.fn(),
// 			// signUpSuccess: {},
// 			// signUpFailure: {},
// 		};
// 		const wrapper = shallow(<Login {...props} />);
// 		expect(wrapper).toHaveLength(1);
// 	});
// });

describe('testing Login component', () => {
	test('should render Login component', () => {
		const wrapper = shallow(
			<Provider store={store}>
				<Login />
			</Provider>
		);
		expect(wrapper).toHaveLength(1);
	});
});

// describe('Render class', () => {
// 	it('to have wrapper submit button', async () => {
// 		const wrapper = mount(
// 			<MemoryRouter>
// 				<Provider store={store}>
// 					<Login />
// 				</Provider>
// 			</MemoryRouter>
// 		);
// 		const form = wrapper.find('.login-form');
// 		const inputs = wrapper.find('.login-form auth-input');

// 		const correctInputs = {
// 			username: 'abcde11',
// 			password: '@Password11',
// 		};

// 		inputs.map(input =>
// 			input.simulate('change', {
// 				name: input.instance().name,
// 				value: correctInputs[input.instance().name],
// 			})
// 		);

// 		form.simulate('button mt-20', { preventDefault: jest.fn() });
// 		expect(form.length).toBe(1);
// 	});
// });
