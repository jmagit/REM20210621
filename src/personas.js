import React, { Component } from "react";
import axios from "axios";
import { ValidationMessage, Esperando } from "./comunes";
import * as MyStore from "./my-store";

export default class PersonasMnt extends Component {
  constructor(props) {
    super(props);
    let pagina = props.match.params.page ? props.match.params.page : 0;
    this.state = { modo: "list", listado: [], elemento: null, loading: true, pagina };
    this.idOriginal = null;
    this.url = "http://localhost:4321/api/personas";
  }

  list() {
    this.setState({ loading: true });
    axios
      .get(`${this.url}?_page=count`)
      .then(resp => {
        let paginas = resp.pages;
        let pagina = this.state.pagina < paginas ? this.state.pagina : paginas - 1;
        this.setState({ pagina, paginas });
        axios
          .get(`${this.url}?_page=${pagina}&_rows=10`)
          .then(resp => {
            this.setState({
              modo: "list",
              listado: resp.data,
              loading: false
            });
          })
          .catch(err => {
            MyStore.AddErrNotifyCmd(err);
            this.setState({ loading: false });
          });
      }).catch(err => {
        MyStore.AddErrNotifyCmd(err);
        this.setState({ loading: false });
      });

    // axios
    //   .get(`${this.url}?page=${this.state.pagina}`)
    //   .then(resp => {
    //     this.setState({
    //       modo: "list",
    //       listado: resp.data,
    //       loading: false
    //     });
    //   })
    //   .catch(err => {
    //     MyStore.AddErrNotifyCmd(err);
    //     this.setState({ loading: false });
    //   });
  }
  add() {
    this.setState({
      modo: "add",
      elemento: { id: "", nombre: "", apellidos: "", edad: "" }
    });
  }
  edit(key) {
    this.setState({ loading: true });
    axios
      .get(this.url + `/${key}`)
      .then(resp => {
        this.setState({
          modo: "edit",
          elemento: resp.data,
          loading: false
        });
        this.idOriginal = key;
      })
      .catch(err => {
        MyStore.AddErrNotifyCmd(err);
        this.setState({ loading: false });
      });
  }
  view(key) {
    this.setState({ loading: true });
    axios
      .get(this.url + `/${key}`)
      .then(resp => {
        this.setState({
          modo: "view",
          elemento: resp.data,
          loading: false
        });
      })
      .catch(err => {
        MyStore.AddErrNotifyCmd(err);
        this.setState({ loading: false });
      });
  }
  delete(key) {
    if (!window.confirm("¿Seguro?")) return;
    this.setState({ loading: true });
    axios
      .delete(this.url + `/${key}`)
      .then(resp => this.list())
      .catch(err => {
        MyStore.AddErrNotifyCmd(err);
        this.setState({ loading: false });
      });
  }
  cancel() {
    this.list();
  }
  send(elemento) {
    // eslint-disable-next-line default-case
    switch (this.state.modo) {
      case "add":
        axios
          .post(this.url, elemento)
          .then(data => this.cancel())
          .catch(err => {
            MyStore.AddErrNotifyCmd(err);
            this.setState({ loading: false });
          });
        break;
      case "edit":
        axios
          .put(this.url + `/${this.idOriginal}`, elemento)
          .then(data => this.cancel())
          .catch(err => {
            MyStore.AddErrNotifyCmd(err);
            this.setState({ loading: false });
          });
        break;
    }
  }
  decodeRuta() {
    if (this.props.match.url === this.urlActual) return;
    this.urlActual = this.props.match.url;
    if (this.props.match.params.id) {
      if (this.props.match.url.endsWith('/edit'))
        this.edit(this.props.match.params.id);
      else
        this.view(this.props.match.params.id);
    } else {
      if (this.props.match.url.endsWith('/add'))
        this.add();
      else
        this.list();
    }
  }

  componentDidMount() {
    this.decodeRuta();
  }
  componentDidUpdate() {
    this.decodeRuta();
  }

  render() {
    if (this.state.loading) return <Esperando />;
    switch (this.state.modo) {
      case "add":
      case "edit":
        return (
          <PersonasForm
            isAdd={this.state.modo === "add"}
            elemento={this.state.elemento}
            onCancel={e => this.cancel()}
            onSend={e => this.send(e)}
          />
        );
      case "view":
        return (
          <PersonasView
            elemento={this.state.elemento}
            onCancel={e => this.cancel()}
          />
        );
      default:
        return (
          <PersonasList
            listado={this.state.listado}
            onAdd={e => this.add()}
            onView={key => this.view(key)}
            onEdit={key => this.edit(key)}
            onDelete={key => this.delete(key)}
          />
        );
    }
  }
}

export class PersonasList extends Component {
  render() {
    return (
      <table className="table table-striped">
        <thead className="thead-dark">
          <tr>
            <th>Nombre</th>
            <th>
              <input
                type="button"
                className="btn btn-primary"
                value="Añadir"
                onClick={e => this.props.onAdd()}
              />
            </th>
          </tr>
        </thead>
        <tbody>
          {this.props.listado.map(item => (
            <tr key={item.id}>
              <td>
                {item["nombre"]} {item.apellidos}
              </td>
              <td>
                <input
                  type="button"
                  className="btn btn-primary"
                  value="Ver"
                  onClick={e => this.props.onView(item.id)}
                />
                <input
                  type="button"
                  className="btn btn-primary"
                  value="Editar"
                  onClick={e => this.props.onEdit(item.id)}
                />
                <input
                  type="button"
                  className="btn btn-danger"
                  value="Borrar"
                  onClick={e => this.props.onDelete(item.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}
export class PersonasView extends Component {
  render() {
    return (
      <div>
        <p>
          <b>Codigo:</b> {this.props.elemento.id}
          <br />
          <b>Nombre:</b> {this.props.elemento.nombre}
          <br />
          <b>Apellidos:</b> {this.props.elemento.apellidos}
          <br />
          <b>Edad:</b> {this.props.elemento.edad}
          <br />
        </p>
        <p>
          <button
            className="btn"
            type="button"
            onClick={e => this.props.onCancel()}
          >
            Cancelar
          </button>
        </p>
      </div>
    );
  }
}

export class PersonasForm extends Component {
  constructor(props) {
    super(props);
    this.state = { elemento: props.elemento, msgErr: [], invalid: false };
    this.handleChange = this.handleChange.bind(this);
    this.onSend = () => {
      if (this.props.onSend) this.props.onSend(this.state.elemento);
    };
    this.onCancel = () => {
      if (this.props.onCancel) this.props.onCancel();
    };
  }
  handleChange(event) {
    const cmp = event.target.name;
    const valor = event.target.value;
    this.setState(prev => {
      prev.elemento[cmp] = valor;
      return { elemento: prev.elemento };
    });
    this.validar();
  }
  validarCntr(cntr) {
    if (cntr.name) {
      // eslint-disable-next-line default-case
      switch (cntr.name) {
        case "nombre":
          cntr.setCustomValidity(cntr.value !== cntr.value.toUpperCase()
            ? "Debe estar en mayusculas" : '');
          break;
      }
    }
  }
  validar() {
    if (this.form) {
      const errors = {};
      let invalid = false;
      for (var cntr of this.form.elements) {
        if (cntr.name) {
          this.validarCntr(cntr);
          errors[cntr.name] = cntr.validationMessage;
          invalid =
            invalid ||
            (errors[cntr.name] !== "" &&
              errors[cntr.name] !== null &&
              typeof errors[cntr.name] !== "undefined");
        }
      }
      this.setState({ msgErr: errors, invalid: invalid });
    }
  }
  componentDidMount() {
    this.validar();
  }
  render() {
    return (
      <form
        ref={tag => {
          this.form = tag;
        }}
      >
        {this.props.isAdd && (
          <div className="form-group">
            <label htmlFor="id">Código</label>
            <input
              type="number"
              className="form-control"
              id="id"
              name="id"
              value={this.state.elemento.id}
              onChange={this.handleChange}
              required
            />
            <ValidationMessage msg={this.state.msgErr.id} />
          </div>
        )}
        {!this.props.isAdd && (
          <div className="form-group">
            <label>Código</label>
            {this.state.elemento.id}
          </div>
        )}
        <div className="form-group">
          <label htmlFor="nombre">Nombre</label>
          <input
            type="text"
            className="form-control"
            id="nombre"
            name="nombre"
            value={this.state.elemento.nombre}
            onChange={this.handleChange}
            required
            minLength="2"
            maxLength="10"
          />
          <ValidationMessage msg={this.state.msgErr.nombre} />
        </div>
        <div className="form-group">
          <label htmlFor="apellidos">Apellidos</label>
          <input
            type="text"
            className="form-control"
            id="apellidos"
            name="apellidos"
            value={this.state.elemento.apellidos}
            onChange={this.handleChange}
            minLength="2"
            maxLength="10"
          />
          <ValidationMessage msg={this.state.msgErr.apellidos} />
        </div>
        <div className="form-group">
          <label htmlFor="edad">Edad</label>
          <input
            type="number"
            className="form-control"
            id="edad"
            name="edad"
            value={this.state.elemento.edad}
            onChange={this.handleChange}
            min="16"
            max="67"
          />
          <ValidationMessage msg={this.state.msgErr.edad} />
        </div>
        <div className="form-group">
          <button
            className="btn btn-primary"
            type="button"
            disabled={this.state.invalid}
            onClick={this.onSend}
          >
            Enviar
          </button>
          <button
            className="btn btn-primary"
            type="button"
            onClick={this.onCancel}
          >
            Cancelar
          </button>
        </div>
      </form>
    );
  }
}
