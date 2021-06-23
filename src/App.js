import React from "react";
import logo from './logo.svg';
import './App.css';
import Demo from './demos';
import FotoMuro from './muro';
import Contador from './contador';
// import { Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem, NavLink } from 'reactstrap';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Formulario from './formulario';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import Calculadora from './calculadora';

class Cabecera extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: false };
    this.toggle = () => this.setState(prev => ({ isOpen: !prev.isOpen }));
  }
  render() {
    return <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand onClick={e => this.props.onSeleccionar(0)}><img src={logo} className="App-logo" alt="logo" /></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {this.props.menu.map((item, index) =>
              <Nav.Item key={index}>
                <Nav.Link onClick={e => this.props.onSeleccionar(index)}>{item.texto}</Nav.Link>
              </Nav.Item>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>;
  }
}

//function App() {
// class App extends React.Component {
//     constructor(props) {
//     super(props);
//     this.menu = [
//       { texto: 'Demos', componente: <Demo /> },
//       { texto: 'Form', componente: <Formulario /> },
//       { texto: 'Muro', componente: <FotoMuro /> },
//       { texto: 'Contador', componente: <Contador init={10} /> },
//     ];
//     this.state = { componente: this.menu[0].componente };
//     this.seleccionar = indice => {
//       this.setState({ componente: this.menu[indice].componente })
//     };
//   }

//   render() {
//     return (
//       <div>
//         {/* <header className="App App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <h1>Hola mundo</h1>
//           <p>
//             Edit <code>src/App.js</code> and save to reload.
//           </p>
//           <a
//             className="App-link"
//             href="https://reactjs.org"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Learn React
//           </a>
//         </header> */}
//         <Cabecera  menu={this.menu} onSeleccionar={this.seleccionar} />
//         <main className="container-fluid">
//           {/* <Demo nombre="App" /> */}
//           {/* <FotoMuro /> */}
//           {this.state.componente}
//         </main>
//       </div>
//     );
//   }
// }

function Header() {
  return <Navbar bg="light" expand="lg">
  <Container>
    <Navbar.Brand onClick={e => this.props.onSeleccionar(0)}><img src={logo} className="App-logo" alt="logo" /></Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">
          <Nav.Item>
            <Link to="/">Inicio</Link>
          </Nav.Item>
          <Nav.Item>
            <Link to="/demos">demos</Link>
          </Nav.Item>
          <Nav.Item>
            <Link to="/chisme/de/hacer/numeros">calculadora 1</Link>
          </Nav.Item>
          <Nav.Item>
            <Link to="/muro">muro</Link>
          </Nav.Item>
          <Nav.Item>
            <Link to="/calculadora">calculadora 2</Link>
          </Nav.Item>
          <Nav.Item>
            <Link to="/falsa">falsa</Link>
          </Nav.Item>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>;
}
function PageNotFound() {
  return <h1>404 Page Not Found!!!</h1>
}
class App extends React.Component {
  render() {
    return (
      <Router>
        <Header />
        <main className="container-fluid">
          <Switch>
            <Route path="/" component={Demo} exact />
            <Route path="/demos" component={Demo} exact />
            <Route path="/chisme/de/hacer/numeros" render={() => <Calculadora coma={true} />} exact />
            <Route path="/muro/:page" component={FotoMuro} exact />
            <Redirect from="/muro" to="/muro/0" />
            <Redirect from="/calculadora" to="/chisme/de/hacer/numeros" />
            <Route component={PageNotFound} exact />
          </Switch>
        </main>
      </Router>
    );
  }
}

export default App;
