import React, { Component } from 'react';
import { BrowserRouter, Route } from "react-router-dom";

import Header from './components/Header';
import Home from './components/Home'
import About from './components/About';
import PostList from './components/PostList';
import PostDetail from './components/PostDetail';

import 'bootstrap/dist/css/bootstrap.css';
import './css/App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Header />
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/blog" component={PostList} />
          <Route path="/blog/:postID" component={PostDetail} />
        </div>
      </BrowserRouter>
      );
  }
}

export default App;
