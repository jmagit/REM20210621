import { Component, useState, useEffect, useRef } from "react";
import loading from './loading.gif';
import './comunes.css';

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }
  static getDerivedStateFromError(error) {  // Actualiza el estado para que el siguiente renderizado lo muestre
    return { hasError: true };
  }
  componentDidCatch(error, info) {  // También puedes registrar el error en un servicio de reporte de errores
    this.setState({ hasError: true, error: error, errorInfo: info })
  }
  render() {
    if (this.state.hasError) { // Puedes renderizar cualquier interfaz de repuesto
      return <div>
        <h1>ERROR</h1>
        {this.state.error && <p>{this.state.error.toString()}</p>}
        {this.state.errorInfo && <p>{this.state.errorInfo.componentStack}</p>}
      </div>;
    }
    return this.props.children;
  }
}

export class Esperando extends Component {
  render() {
    return <div>
      <div className="ajax-wait"></div>
      <img className="ajax-wait" src={loading} alt="Cargando ..." />
    </div>;
  }
}

export class ValidationMessage extends Component {
  render() {
    if (this.props.msg) {
      return <span className="errorMsg">{this.props.msg}</span>;
    }
    return null;
  }
}
export class ErrorMessage extends Component {
  render() {
    if (this.props.msg) {
      return (
        <div
          className="alert alert-danger alert-dismissible fade show"
          role="alert"
        >
          {this.props.msg}
          <button
            type="button"
            className="close"
            data-dismiss="alert"
            aria-label="Close"
            onClick={e => this.props.onClear && this.props.onClear()}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      );
    }
    return null;
  }
}
export function useCoordenadas() {
  const [coordenadas, setCoordenadas] = useState({ latitud: null, longitud: null });
  const watchId = useRef(0);
  useEffect(() => {
    watchId.current = window.navigator.geolocation.watchPosition(pos => {
      setCoordenadas({
        latitud: pos.coords.latitude,
        longitud: pos.coords.longitude
      })
    });
    return () => window.navigator.geolocation.clearWatch(watchId.current);
  });
  return coordenadas;
}

export function Coordenadas(props) {
  const coordenadas = useCoordenadas();
  return coordenadas.latitud == null ? (<div>Cargando</div>) : (
    <div>
      <h1>Coordenadas</h1>
      <h2>Latitud: {coordenadas.latitud}</h2>
      <h2>Longitud: {coordenadas.longitud}</h2>
    </div>
  );
}
// export function Coordenadas(props) {
//   const [coordenadas, setCoordenadas] = useState({ latitud: null, longitud: null});
//   let watchId = null;
//   useEffect(() => {
//     watchId = window.navigator.geolocation.watchPosition(pos => {
//       setCoordenadas({latitud: pos.coords.latitude, longitud: pos.coords.longitude });
//       // console.log('Coordenadas');
//     });
//     return () => window.navigator.geolocation.clearWatch(watchId);
//   });
//   return coordenadas.latitud == null ? (<div>Cargando</div>) : (
//       <div>
//         <h1>Coordenadas</h1>
//         <h2>Latitud: {coordenadas.latitud}</h2>
//         <h2>Longitud: {coordenadas.longitud}</h2>
//       </div>
//     );
// }