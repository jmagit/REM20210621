import React, { useState } from "react";
import { connect } from 'react-redux'
import * as MyStore from './my-store';
import axios from "axios";

axios.interceptors.request.use((config) => {
    if (MyStore.store.getState().auth.isAuth)
        config.headers['Authorization'] = MyStore.store.getState().auth.authToken;
    return config;
}, (error) => {
    return Promise.reject(error);
});


const XLogin = ({ auth, onLogin, onLogout, onError }) => {
    const [usr, setUser] = useState('admin')
    const [pwd, setPwd] = useState('P@$$w0rd')
    if (auth.isAuth)
        return (
            <div>
                Hola {auth.name} <input className="btn btn-outline-success" type="button" value="logout" onClick={onLogout} />
            </div>
        );
    else
        return (
            <form className="d-flex">
                <input type="text" value={usr} onChange={(e) => setUser(e.target.value)} placeholder='Usuario' className="form-control" />
                <input type="password" value={pwd} onChange={(e) => setPwd(e.target.value)} placeholder='Contraseña' className="form-control" />
                <input className="btn btn-outline-success" type="button" value="login" onClick={() => {
                    axios.post('http://localhost:4321/login', { name: usr, password: pwd })
                        .then(resp => { resp.data.success ? onLogin(resp.data.token, resp.data.name) : onError('Usuario o contraseña invalida.') })
                }} />
            </form>
        );
}

export const LoginComponent = connect(
    (state, ownProps) => {
        return {
            auth: state.auth,
        }
    },
    (dispatch, ownProps) => {
        return {
            onLogin: MyStore.LoginCmd,
            onLogout: MyStore.LogoutCmd,
            onError: MyStore.AddNotifyCmd,
        }
    }
)(XLogin);