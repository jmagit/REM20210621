import React, { Component } from 'react'
import PropTypes from 'prop-types';

function Saluda(props) {
    return <h1>Hola {props.nombre}</h1>;
}


class Despide extends Component {
    constructor(props) {
        super(props);
        this.veces = this.props.veces + 1
    }
    repite() {
        let rslt = [];
        for(let i = 0; i < (this.veces); i++) {
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
    render() {
        return (
            <React.Fragment>
                <Saluda nombre="Don Pepito" />
                <Saluda nombre="Don Jose" />
                <Saluda />
                <Despide nombre={this.props.nombre} veces={2} />
            </React.Fragment>
        );
    }
}