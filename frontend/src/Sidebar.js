import React from 'react';
import { Col, InputGroup, Input,
  Navbar, Nav, NavItem, NavLink,
  NavbarBrand, Button } from 'reactstrap';

import 'bootstrap/dist/css/bootstrap.css';

class Sidebar extends React.Component {
  render() {
    return (
      <Col xs='3'>
        <Navbar fluid>
          <br/>
          <br/>
          <br/>
          <br/>{/* Get rid of this shit */} 
          <InputGroup>
            <Input placeholder="Search" />
          </InputGroup>
          <NavbarBrand href='/'>Recent Blog Posts</NavbarBrand>
          <Nav vertical justified>
            <NavItem>
              <NavLink href='#'>Post 1</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href='#'>Post 2</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href='#'>Post 3</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href='#'>Post 4</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href='#'>Post 5</NavLink>
            </NavItem>
            <hr/>
            <NavItem>
              <Button color="primary">Archive</Button>
            </NavItem>
            <NavItem>
              <NavLink href='#'>Newsletter</NavLink>
            </NavItem>
          </Nav>
        </Navbar>
      </Col>
      );
  }
}

export default Sidebar;
