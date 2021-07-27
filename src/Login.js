import React, { Component } from "react";
import fb from "./firebase"

export default class Login extends Component {
    usuario = React.createRef();
    contraseña = React.createRef();

    constructor(props) {
        super(props);
        //Este enlacee es necesario para hacer que 'this' funcione en el callback
        this.login = this.login.bind(this);
        this.signup = this.signup.bind(this);
    }

    login(e) {
        e.preventDefault();
        var misusuario = this.usuario.current.value;
        var micontraseña = this.contraseña.current.value;

        fb
        .auth()
        .signInWithEmailAndPassword(misusuario, micontraseña)
        .then(u => {})
    }
}