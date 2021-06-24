import React from 'react'
import { connect } from 'react-redux'
import * as MyStore from './my-store';

const notificaciones = ({ listado, ocultar, onDelete, onClear }) => {
    if(ocultar) return null;
    return <div className="container-fluid" >
        {listado.map((item, index) => <div key={index} className="alert alert-danger alert-dismissible fade show">
                {item}
                <button type="button" className="close" aria-label="Close" onClick={(e) => onDelete(index) }>
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>)}
            <div className="text-center">
            <input type="button" className="btn btn-dark" value="Cerrar" onClick={(e) => onClear() } />
            </div>
        </div>
} 

export const Notificaciones = connect(
    (state, ownProps) => {
        return {
            listado: state.notify.listado,
            ocultar: !state.notify.hayNotificaciones
        }
    },
    (dispatch, ownProps) => {
        return {
            onDelete: (index) => { dispatch(MyStore.DeleteNotifyAction(index)) },
            onClear: () => { dispatch(MyStore.ClearNotifyAction()) },
        }
    }
)(notificaciones);