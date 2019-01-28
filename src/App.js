import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Link } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div className="App">
      <Link to="/login">
        <header className="App-header">
          <h1>Ruddy Castro</h1>
          <h3><b>Mi compromiso es contigo!</b></h3>
        </header>
        </Link>
      </div>
    );
  }
}

export default App;
