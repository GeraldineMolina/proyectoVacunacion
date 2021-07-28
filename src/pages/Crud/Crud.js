import React, { Component } from "react";
import firebase from "../../config/firebase";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import { Table } from 'reactstrap';
import 'module';
import crud from '../../pages/Crud/crud';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

class App extends Component {
  state = {
    data: [],
    modalInsertar: false,
    modalEditar: false,
    form:{
      canal: '',
      idioma: '',
      pais: '',
      suscriptores: ''
    },
    id: 0
  };

  peticionGet = () => {
    firebase.child("canales").on("value", (canal) => {
      if (canal.val() !== null) {
        this.setState({ ...this.state.data, data: canal.val() });
      } else {
        this.setState({ data: [] });
      }
    });
  };

  componentDidMount() {
    this.peticionGet();
  }
  render () {
      return(
        <div className="App">
          <br />
            <button className="btn btn success">Insertar</button>
          <br />

          <Table className="table table-bordered">
          <thead>
            <tr>
              <th>Canal</th>
              <th>Idioma</th>
              <th>País</th>
              <th>Suscriptores (en millones)</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(this.state.data).map(i=>{
             // console.log(i);
              return <tr key={i}>
                <td>{this.state.data[i].canal}</td>
                <td>{this.state.data[i].idioma}</td>
                <td>{this.state.data[i].pais}</td>
                <td>{this.state.data[i].suscriptores}</td>
                <td>
                  <button className="btn btn-primary" onClick={()=>this.seleccionarCanal(this.state.data[i], i, 'Editar')}>Editar</button> {"   "}
                  <button className="btn btn-danger" onClick={()=>this.seleccionarCanal(this.state.data[i], i, 'Eliminar')}>Eliminar</button>
                </td>

              </tr>
            })}
          </tbody>
            </Table>

        <Modal isOpen={this.state.modalInsertar}>
        <ModalHeader>Insertar Registro</ModalHeader>
        <ModalBody>
            <div className="form-group">
            <label>Canal: </label>
            <br />
            <input type="text" className="form-control" name="canal" onChange={this.handleChange}/>
            <br />
            <label>País: </label>
            <br />
            <input type="text" className="form-control" name="pais" onChange={this.handleChange}/>
            <br />
            <label>Idioma: </label>
            <br />
            <input type="text" className="form-control" name="idioma" onChange={this.handleChange}/>
            <br />
            <label>Cantidad de Suscriptores (millones): </label>
            <br />
            <input type="text" className="form-control" name="suscriptores" onChange={this.handleChange}/>
            </div>
        </ModalBody>
        <ModalFooter>
            <button className="btn btn-primary" onClick={()=>this.peticionPost()}>Insertar</button>{"   "}
            <button className="btn btn-danger" onClick={()=>this.setState({modalInsertar: false})}>Cancelar</button>
        </ModalFooter>
        </Modal>

        </div>
      )
  }
}

export default crud;

