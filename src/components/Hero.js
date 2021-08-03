import React, { Component } from 'react'
import  firebase from '../firebase-config';
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, ModalBody, ModalHeader, ModalFooter  } from "reactstrap";


function Hero(props) {
    
    const { handleLogout } = props;

    return(
        <>
        <section className="hero">
            <nav>
                <h2>Welcome</h2>
                <button onClick={handleLogout}>Salir</button>
            </nav>
    

        </section> 
        <section>

        </section>
        </>
    )


}

export default Hero;
