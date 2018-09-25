import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
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
    return (<div>
      <Navbar className="navi" fluid={'top'} light="light" expand='md'>
        <NavbarBrand href='/' ><span className="header-item">Goddess Climbing</span></NavbarBrand>
        <NavbarToggler onClick={this.toggle}/>
        <Collapse isOpen={this.state.isOpen} navbar="navbar">
          <Nav className='ml-auto align-items-end' navbar="navbar">
            <NavItem>
              <NavLink href='/'><span className="header-item">Home</span></NavLink>
            </NavItem>
            <NavItem>
              <NavLink href='/about'><span className="header-item">About</span></NavLink>
            </NavItem>
            <NavItem>
              <NavLink href='/blog'><span className="header-item">Blog</span></NavLink>
            </NavItem>
            <NavLink href='/contact'>
              <span className="header-item">Contact</span>
            </NavLink>
          </Nav>
        </Collapse>
      </Navbar>
    </div>);
  }
}

export default Header;
