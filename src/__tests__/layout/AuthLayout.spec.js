import React from 'react';
import { shallow } from 'enzyme';
import AppLayout from '../../layout/AppLayout';

const title = 'Chat one on one Application';

let wrapped = shallow(<AppLayout>{title}</AppLayout>);

describe('AppLayout', () => {
	it('should render the AppLayout Component correctly', () => {
		expect(wrapped).toHaveLength(1);
	});
	it('renders the AppLayouts children', () => {
		expect(wrapped.find('h1').text()).toEqual(title);
	});
});
