import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { expect } from 'chai';
import { shallow } from 'enzyme'
import PhotoGrid from '../components/PhotoGrid';
import { Container, CardColumns, Card } from 'reactstrap';

Enzyme.configure({adapter: new Adapter()});

describe('<PhotoGrid />', () => {
	it('renders container', () => {
		const wrapper = shallow(<PhotoGrid />);
		expect(wrapper.find(Container));
	});

	it('renders cardcolumns', () => {
		const wrapper = shallow(<PhotoGrid />);
		expect(wrapper.find(CardColumns));
	});

	it('renders cards', () => {
		const wrapper = shallow(<PhotoGrid />);
		expect(wrapper.find(Card));
	});
});