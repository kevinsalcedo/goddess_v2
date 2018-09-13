import React, { Component } from 'react';
import { BrowserRouter, Route } from "react-router-dom";

import Header from './components/Header.js';
import Home from './components/Home.js'
import About from './components/About.js';

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
        </div>
      </BrowserRouter>
      );
  }
}

export default App;
