import React, { Component } from "react";
import PropTypes from "prop-types";
import "./calculadora.css";

const Pantalla = props => (
  <tr>
    <th colSpan="4" className="Pantalla">
      {props.coma ? props.pantalla.replace(/\./g, ",") : props.pantalla}
    </th>
  </tr>
);
const Resumen = props => (
  <tr>
    <th colSpan="4" className="Resumen">
      {props.coma ? props.resumen.replace(/\./g, ",") : props.resumen}
    </th>
  </tr>
);
class BtnCalcular extends Component {
  constructor(props) {
    super(props);
    this.handleClick = () => {
      if (this.props.onClick) this.props.onClick(this.props.texto);
    };
  }
  render() {
    return (
      <td colSpan={this.props.colSpan ? this.props.colSpan : 1}>
        <button className={this.props.css} onClick={this.handleClick}>
          {this.props.texto}
        </button>
      </td>
    );
  }
}
export default class Calculadora extends Component {
  static propTypes = {
    value: PropTypes.number,
    onChange: PropTypes.func,
    coma: PropTypes.bool
  };
  static defaultProps = {
    coma: false
  };
  constructor(props) {
    super(props);
    this.state = {
      pantalla: "0",
      resumen: ""
    };
    this.acumulado = 0;
    this.operador = "+";
    this.limpiar = true;

    this.inicia = this.inicia.bind(this);
    this.ponDijito = this.ponDijito.bind(this);
    this.ponComa = this.ponComa.bind(this);
    this.borrar = this.borrar.bind(this);
    this.cambiaSigno = this.cambiaSigno.bind(this);
    this.calcula = this.calcula.bind(this);
  }

  render() {
    let cabecera = [];
    if(this.state.resumen) {
      cabecera.push(<Resumen resumen={this.state.resumen} coma={this.props.coma} />)
    }
    cabecera.push(<Pantalla pantalla={this.state.pantalla} coma={this.props.coma} />)
    return (
      <table className="Calculadora">
        <thead>
        <Resumen resumen={this.state.resumen} />
        <Pantalla pantalla={this.state.pantalla} coma={this.props.coma} />
        </thead>
        <tbody>
          <tr>
            <BtnCalcular css="btnOperar" texto="CE" onClick={this.inicia} />
            <BtnCalcular css="btnOperar" texto="Borrar" onClick={this.borrar} colSpan="2" />
            <BtnCalcular css="btnOperar" texto="+" onClick={this.calcula} />
          </tr>
          <tr>
            {[7, 8, 9].map(item => (
              <BtnCalcular key={"btn" + item} css="btnDigito" texto={item} onClick={this.ponDijito} />
            ))}
            <BtnCalcular css="btnOperar" texto="-" onClick={this.calcula} />
          </tr>
          <tr>
            {[4, 5, 6].map(item => (
              <BtnCalcular key={"btn" + item} css="btnDigito" texto={item} onClick={this.ponDijito} />
              ))}
            <BtnCalcular css="btnOperar" texto="*" onClick={this.calcula} />
          </tr>
          <tr>
            {[1, 2, 3].map(item => (
              <BtnCalcular key={"btn" + item} css="btnDigito" texto={item} onClick={this.ponDijito} />
              ))}
            <BtnCalcular css="btnOperar" texto="/" onClick={this.calcula} />
          </tr>
          <tr>
            <BtnCalcular css="btnDigito" texto="±" onClick={this.cambiaSigno} />
            <BtnCalcular css="btnDigito" texto="0" onClick={this.ponDijito} />
            <BtnCalcular css="btnDigito" texto={this.props.coma ? "," : "."} onClick={this.ponComa} />
            <BtnCalcular css="btnOperar" texto="=" onClick={this.calcula} />
          </tr>
        </tbody>
      </table>
    );
  }
  inicia() {
    this.acumulado = 0;
    this.operador = "+";
    this.limpiar = true;
    this.setState({ pantalla: "0", resumen: "" });
  }

  ponDijito(value) {
    if (typeof value !== "string") {
      value = value.toString();
    }
    if (value.length !== 1 || value < "0" || value > "9") {
      console.error("No es un valor numerico.");
      return;
    }
    if (this.limpiar || this.state.pantalla === "0") {
      this.setState({ pantalla: value });
      this.limpiar = false;
    } else {
      this.setState(prev => {
        return { pantalla: prev.pantalla + value };
      });
    }
  }

  ponComa() {
    if (this.limpiar) {
      if (!isFinite(this.acumulado) || isNaN(this.acumulado)) {
        return;
      }
      this.setState({ pantalla: "0." });
      this.limpiar = false;
    } else if (this.state.pantalla.indexOf(".") === -1) {
      this.setState(prev => {
        return { pantalla: prev.pantalla + "." };
      });
    }
  }

  borrar() {
    if (this.limpiar || this.state.pantalla.length === 1) {
      this.setState({ pantalla: "0" });
      this.limpiar = true;
    } else {
      this.setState(prev => {
        return { pantalla: prev.pantalla.substr(0, prev.pantalla.length - 1) };
      });
    }
  }

  cambiaSigno() {
    this.setState(prev => ({ pantalla: (-prev.pantalla).toString() }));
    if (this.limpiar) {
      this.acumulado = -this.acumulado;
    }
  }

  calcula(nuevo) {
    if ("+-*/=".indexOf(nuevo) === -1) {
      console.error(`Operacion no soportada: ${nuevo}`);
      return;
    }
    let pantalla = this.state.pantalla;
    let resumen = this.state.resumen;
    const operando = parseFloat(pantalla);
    switch (this.operador) {
      case "+":
        this.acumulado += operando;
        break;
      case "-":
        this.acumulado -= operando;
        break;
      case "*":
        this.acumulado *= operando;
        break;
      case "/":
        this.acumulado /= operando;
        break;
      case "=":
      default:
        break;
    }
    // Con eval()
    // acumulado = eval (acumulado + this.operador + pantalla);
    resumen = nuevo === "=" ? "" : resumen + pantalla + nuevo;
    pantalla = this.acumulado.toString();
    this.operador = nuevo;
    this.limpiar = true;
    if (this.props.onChange) this.props.onChange(this.acumulado);
    this.setState({ pantalla, resumen });
  }
}
