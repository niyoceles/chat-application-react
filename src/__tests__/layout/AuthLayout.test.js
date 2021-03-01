import React from 'react';
import { shallow } from 'enzyme';
import AuthLayout from '../../layout/AuthLayout';

const title = 'Chat one on one Application';

let wrapped = shallow(<AuthLayout>{title}</AuthLayout>);

describe('AuthLayout', () => {
	it('should render the AuthLayout Component correctly', () => {
		expect(wrapped).toHaveLength(1);
	});
	it('renders the AuthLayouts children', () => {
		expect(wrapped.find('h1').text()).toEqual(title);
	});
});
