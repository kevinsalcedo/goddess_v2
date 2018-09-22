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
          <Route exact path="/about" component={About} />
          <Route exact path="/blog" component={PostList} />
          <Route path="/blog/:postTitle" component={PostDetail} />
        </div>
      </BrowserRouter>
      );
  }
}

export default App;
