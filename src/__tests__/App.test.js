import React from 'react';
import { shallow } from 'enzyme';
import App from '../App';

describe('testing App component', () => {
	test('should render App component', () => {
		const wrapper = shallow(<App />);
		expect(wrapper).toHaveLength(1);
	});
});
