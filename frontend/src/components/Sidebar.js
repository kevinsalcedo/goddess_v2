import React from 'react';
import {
  Col,
  Navbar,
  Nav,
  NavItem,
  NavLink,
  NavbarBrand
} from 'reactstrap';

import 'bootstrap/dist/css/bootstrap.css';
import '../css/Sidebar.css';

class Sidebar extends React.Component {
  state = {
    recent_posts: []
  }

  async componentDidMount() {
    try {
      const res = await fetch('http://127.0.0.1:8000/api/');
      const recent_posts = await res.json();
      this.setState({recent_posts});
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return (<Col xs='3'>
      <Navbar className="sidenavi" fluid>
        <NavbarBrand className="text">Recent Blog Posts</NavbarBrand>
        <Nav vertical justified>
          {
            this.state.recent_posts.map(post => (<div>
              <NavItem className="postName" key={post.id}>
                <NavLink href={`/blog/${post.id}`}>{post.title}</NavLink>
              </NavItem>
              <hr/>
            </div>))
          }
        </Nav>
      </Navbar>
    </Col>);
  }
}

export default Sidebar;
