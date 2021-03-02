import React from 'react';
import { shallow } from 'enzyme';
import Input from '../../../components/Input/Input';

describe.skip('testing Input component', () => {
	test('should render Input component', () => {
		const wrapper = shallow(<Input />);
		expect(wrapper).toHaveLength(1);
	});
});
