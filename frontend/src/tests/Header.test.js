import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { expect } from 'chai';
import { mount, shallow } from 'enzyme';
import { spy } from 'sinon';
import Header from '../components/Header.js';
import { Navbar, NavbarBrand, NavLink } from 'reactstrap';

Enzyme.configure({adapter: new Adapter() });

describe('<Header />', () => {
	it('renders navbar', () => {
		const wrapper = shallow(<Header />);
		expect(wrapper.find(Navbar));
	});

	it('renders navbar brand', () => {
		const wrapper = shallow(<Header />);
		expect(wrapper.find(NavbarBrand));
	});

	it('renders all nav links', () => {
		const wrapper = shallow(<Header />);
		expect(wrapper.find(NavLink)).to.have.lengthOf(4);
	});
})