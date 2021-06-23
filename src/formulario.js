import React, { Component } from 'react'

class ValidationMessage extends React.Component {
    render() {
        if (this.props.msg) {
            return <span className="errorMsg">{this.props.msg}</span>;
        }
        return null;
    }
}

export default class Formulario extends Component {
    constructor(props) {
        super(props);
        this.state = {
            invalid: false,
            elemento: {
                id: '',
                nombre: 'Pepito',
                apellidos: 'Grillo',
            },
            msgErr: {},
        }
        this.send = this.send.bind(this);
        this.inputChange = this.inputChange.bind(this);
        this.miForm = null;
    }

    inputChange(e) {
        let ele = this.state.elemento;
        ele[e.target.name] = e.target.value.toUpperCase();
        this.setState({ elemento: ele })
        this.validate();
    }
    send(e) {
        e.preventDefault();
        alert(JSON.stringify(this.state.elemento));
        // if (this.miForm) {
        //     const ele = {};
        //     for (let cntr of this.miForm.elements) {
        //         if (cntr.name) {
        //             ele[cntr.name] = cntr.value;
        //         }
        //     }
        //     alert(JSON.stringify(ele));
        // }
    }
    validate() {
        if (this.miForm) {
            const errors = {};
            let invalid = false;
            for (let cntr of this.miForm.elements) {
                if (cntr.name) {
                    // switch(cntr.name) {
                    //     case 'nombre':
                    //         if(cntr.value !== cntr.value.toUpperCase())
                    //             cntr.setV
                    //         break;
                    // }
                    errors[cntr.name] = cntr.validationMessage;
                    invalid = invalid || (errors[cntr.name] !== '' && errors[cntr.name] !== null && typeof (errors[cntr.name]) !== "undefined");
                }
            }
            this.setState({ msgErr: errors, invalid: invalid });
        }
    }
    componentDidMount() {
        this.validate();
        
    }
    render() {
        return (
            <form ref={tag => this.miForm = tag} onSubmit={this.send} >
                <p>
                    Id: <input type="number" name="id" value={this.state.elemento.id} onChange={this.inputChange} required />
                    <ValidationMessage msg={this.state.msgErr.id} /><br />
                    Nombre: <input type="text" name="nombre" value={this.state.elemento.nombre}
                        onChange={this.inputChange} required minLength="2" maxLength="10" />
                    <ValidationMessage msg={this.state.msgErr.nombre} /><br />
                    Apellidos: <input type="text" name="apellidos" value={this.state.elemento.apellidos}
                        onChange={this.inputChange} minLength="2" maxLength="10" />
                    <ValidationMessage msg={this.state.msgErr.apellidos} />
                    {/* Apellidos: <input type="text" name="apellidos" defaultValue={this.state.elemento.apellidos} /> */}
                </p>
                <p>
                    <input type="button" value="Enviar" onClick={this.send} disabled={this.state.invalid} />
                    <input type="submit" value="Submit" />
                </p>
            </form>
        )
    }
}
