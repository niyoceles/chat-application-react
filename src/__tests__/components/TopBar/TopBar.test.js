import React from 'react';
import { shallow } from 'enzyme';
import TopBar from '../../../components/TopBar/TopBar';

describe('testing TopBar component', () => {
	test('should render TopBar component', () => {
		const wrapper = shallow(<TopBar />);
		expect(wrapper).toHaveLength(1);
	});
});
