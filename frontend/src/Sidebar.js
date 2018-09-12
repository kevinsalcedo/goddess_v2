import React from 'react';
import { Col, InputGroup, Input,
  Navbar, Nav, NavItem, NavLink,
  NavbarBrand, Button } from 'reactstrap';


import 'bootstrap/dist/css/bootstrap.css';

class Sidebar extends React.Component {
  state = {
    recent_posts: []
  }

  async componentDidMount() {
    try {
      const res = await fetch('http://127.0.0.1:8000/api/');
      const recent_posts = await res.json();
      this.setState({
        recent_posts
      });
    } catch (e) {
      console.log(e);
    }
  }

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
            {this.state.recent_posts.map(post => (
              <NavItem key={post.id}>
                <NavLink href={`/posts/${post.id}`}>{post.title}</NavLink>
              </NavItem>
            ))}
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
