import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import logo01 from '../assets/goddess-climbing-WHITE-01.png';
import 'bootstrap/dist/css/bootstrap.css';
import '../css/Header.css';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
  <div>
    <Navbar className="navbar fixed-top light" light expand='md'>
      <NavbarBrand className="navbar-brand header-logo" href='/'>
        <img className="brand-logo" src={logo01}  alt="goddess-climbing-logo-01"/>
      </NavbarBrand>
      <NavbarToggler className="ml-auto" onClick={this.toggle}/>
      <Collapse isOpen={this.state.isOpen} navbar>
        <Nav className='ml-auto' navbar>
          <NavItem>
            <NavLink href='/'>
              <span className="header-item header-link">Home</span>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href='/blog'>
              <span className="header-item header-link">Blog</span>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href='/photos'>
              <span className="header-item header-link">Photos</span>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href='/about'>
              <span className="header-item header-link">About</span>
            </NavLink>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
    <div className="header-img" />
  </div>);
  }
}

export default Header;
