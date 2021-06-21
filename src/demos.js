import React, { Component } from 'react'

function Saluda(props) {
    return <h1>Hola mundo</h1>;
}


class Despide extends Component {
    render() {
        return (
            <h1>Adios mundo</h1>
        )
    }
}

export default class Demo extends Component {
    render() {
        return (
            <React.Fragment>
                <Saluda />
                <Despide />
            </React.Fragment>
        );
    }
}