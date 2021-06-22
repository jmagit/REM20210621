import React from "react";
import logo from './logo.svg';
import './App.css';
import Demo from './demos';
import FotoMuro from './muro';

//function App() {
class App extends React.Component {

  render() {
    return (
      <div>
        <header className="App App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>Hola mundo</h1>
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        <div className="container-fluid">
          {/* <Demo nombre="App" /> */}
          <FotoMuro />
        </div>
      </div>
    );
  }
}

export default App;
