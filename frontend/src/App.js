import React, { Component } from 'react';
import { BrowserRouter, Route } from "react-router-dom";

import Header from './components/Header';
import Home from './components/Home'
import About from './components/About';
import PostList from './components/PostList';
import PostDetail from './components/PostDetail';
import PhotoGrid from './components/PhotoGrid';
import Footer from './components/Footer';

import 'bootstrap/dist/css/bootstrap.css';
import './css/App.css';

class App extends Component {

  render() {
    return (
      <BrowserRouter >
        <div className="App">
          <Header />
          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={About} />
          <Route exact path="/blog" component={PostList} />
          <Route path="/blog/:postTitle" component={PostDetail} />
          <Route exact path="/photos" component={PhotoGrid} />
          <Footer />
        </div>
      </BrowserRouter>
      );
  }
}

export default App;
