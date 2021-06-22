import React, { Component } from 'react'
import PropTypes from 'prop-types';

export default class Contador extends Component {
    constructor(props) {
        super(props);
        this.state = { contador: props.init, delta: props.delta ? props.delta : 1 }
        this.sube = () => this.handleOnCambia(1);
        this.baja = this.baja.bind(this);
        this.btnBaja = React.createRef();

    }
    baja() {
        this.handleOnCambia(-1);
    }

    handleOnCambia(signo) {
        this.setState((prev) => {;
            const rslt = prev.contador + signo * prev.delta;
            if(this.props.onCambia)
                this.props.onCambia(rslt);
            return { contador: rslt }
        });
    }

    render() {
        return (
            <div>
                <h1>{this.state.contador}</h1>
                <p>
                    <input ref={this.btnBaja} type="button" value="-" onClick={this.baja} />
                    <input type="button" value="+" onClick={this.sube} />
                </p>
            </div>
        )
    }
    componentDidMount() {
        this.btnBaja.current.focus();
    }
    componentDidUpdate(next_props, next_state) {
        this.btnBaja.current.focus();        
    }
}
Contador.propTypes = {
    init: PropTypes.number.isRequired, 
    delta: PropTypes.any,
    onCambia: PropTypes.func
  };
  