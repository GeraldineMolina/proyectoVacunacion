import React, { useState } from 'react'
import 'firebase/auth';
import {
    useFirebaseApp
} from 'reactfire'
// import {Link} from "react-router-dom"


export default (props) => {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    const firebase = useFirebaseApp();

    const submit = async ()=>{
        await firebase.auth().createUserWithEmailAndPassword [email,password];
    }

    // const Login = async ()=>{
    //     await firebase.auth().signInWithEmailAndPassword [email,password];
    // }

    // const logout = async ()=>{
    //     await firebase.auth().signOut();
    // }

    return(
        <div>
            <div>
                <label htmlFor="email">Correo electronico</label>
                <input type="email" id="email" onChange={ (ev)=> setEmail(ev.target.value) } />
                <label htmlFor="password">Contraseña</label>
                <input type="password" id="password" onChange={ (ev)=> setPassword(ev.target.value) } />
                {/* <button onClick={Login}>Iniciar sesion</button> */}
                <button onClick={submit}>Crear Cuenta</button>
            </div>
        </div>
    )
}