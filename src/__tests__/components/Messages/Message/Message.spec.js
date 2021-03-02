import React from 'react';
import { shallow } from 'enzyme';
import Message from '../../../../components/Messages/Message/Message';

describe.skip('testing Message component', () => {
	test('should render Message component', () => {
		const wrapper = shallow(<Message  />);
		expect(wrapper).toHaveLength(1);
	});
});
