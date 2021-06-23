import React, { Component } from 'react'
import PropTypes from 'prop-types';
import Contador, { ContadorFunc } from './contador';
import Calculadora from './calculadora';
import { ErrorBoundary, Coordenadas, useCoordenadas } from './comunes';
import { Link } from 'react-router-dom';


function Saluda(props) {
    const coordenadas = useCoordenadas();
    return <div>
        <h1>Hola {props.nombre}</h1>
        <h2>Latitud: {coordenadas.latitud}</h2>
        <h2>Longitud: {coordenadas.longitud}</h2>
    </div>
        ;
}


class Despide extends Component {
    constructor(props) {
        super(props);
        this.veces = this.props.veces + 1
    }
    repite() {
        let rslt = [];
        for (let i = 0; i < (this.veces); i++) {
            rslt.push(<li key={i}>Adios {this.props.nombre}</li>);

        }
        return rslt;
    }

    render() {
        return (
            <div>
                <p><b>Nº Veces: </b> {this.veces}</p>
                <ol>
                    {this.repite()}
                </ol>
            </div>
        );
    }
}
Despide.propTypes = {
    veces: PropTypes.number,
}
Despide.defaultProps = {
    veces: 0,
}
export default class Demo extends Component {
    constructor(props) {
        super(props);
        this.state = { resultado: 10 };
    }
    render() {
        return (
            <React.Fragment>
                <Coordenadas />
                <Link to="/muro">muro</Link> | 
                <Link to="muro">mal</Link> | 
                <a href="/muro">Peor</a>
                <ContadorFunc init={18} />
                <Calculadora coma={true} />
                <ErrorBoundary>
                    <Contador init={this.state.resultado} delta={2} onCambia={(value) => this.setState({ resultado: value })} />
                </ErrorBoundary>
                {/* <input type="text" value={this.state.resultado} /> */}
                El resultado es {this.state.resultado}
                <input type="button" value="cambia" onClick={() => this.setState({ resultado: 100 })} />
                <Saluda nombre="Don Pepito" />
                <Saluda nombre="Don Jose" />
                <Saluda />
                <Despide nombre={this.props.nombre} veces={2} />
            </React.Fragment>
        );
    }
}