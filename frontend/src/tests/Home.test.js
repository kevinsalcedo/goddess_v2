import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import Home from '../components/Home.js';
import {Container} from 'reactstrap';

Enzyme.configure({adapter: new Adapter() });

describe('<Home />', () => {
	it('renders container', () => {
		const wrapper = shallow(<Home />);
		expect(wrapper.find(Container));
	});
});