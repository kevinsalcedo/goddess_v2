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
  <div className="header-img">
    <Navbar navbar-fixed-top light expand='md'>
      <NavbarBrand href='/'>
        <span className="header-item header-brand">Goddess Climbing</span>
      </NavbarBrand>
      <NavbarToggler onClick={this.toggle}/>
      <Collapse isOpen={this.state.isOpen} navbar>
        <Nav className='ml-auto' navbar>
          <NavItem>
            <NavLink href='/'>
              <span className="header-item header-link">Home</span>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href='/about'>
              <span className="header-item header-link">About</span>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href='/blog'>
              <span className="header-item header-link">Blog</span>
            </NavLink>
          </NavItem>
          <NavLink href='/contact'>
            <span className="header-item header-link">Contact</span>
          </NavLink>
        </Nav>
      </Collapse>
    </Navbar>
  </div>);
  }
}

export default Header;
