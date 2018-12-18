import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';
import Header from '../components/Header';
import Footer from '../components/Footer';

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { expect } from 'chai';
import { shallow } from 'enzyme';

Enzyme.configure({adapter: new Adapter() });

describe('<App />', () => {
	it('renders without crashing', () => {
  		const div = document.createElement('div');
  		ReactDOM.render(<App />, div);
  		ReactDOM.unmountComponentAtNode(div);
	});

	it('renders a header', () => {
		const wrapper = shallow(<App />);
		expect(wrapper.find(Header));
	});

	it('renders a footer', () => {
		const wrapper = shallow(<App />);
		expect(wrapper.find(Footer));
	});
});


