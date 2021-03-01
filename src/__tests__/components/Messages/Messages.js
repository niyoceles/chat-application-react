import React from 'react';
import { shallow } from 'enzyme';
import Messages from '../../../components/Messages/Messages';

describe.skip('testing Messages component', () => {
	test('should render Messages component', () => {
		const wrapper = shallow(<Messages />);
		expect(wrapper).toHaveLength(1);
	});
});
