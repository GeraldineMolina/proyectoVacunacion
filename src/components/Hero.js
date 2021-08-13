import '../utils/css/estilos_hero.css';
import { TableContainer,
         Table , 
         TableHead , 
         TableBody , 
         TableRow , 
         TableCell,
         TextField,
         Modal,

         Button}
    from '@material-ui/core';

import React, {useEffect, useState} from 'react';
import forjaicono from '../utils/images/Logo_Forja.png';
import editar from '../utils/images/iconodeeditar.png';
import { makeStyles } from '@material-ui/core';
import fire from "../firebase-config";
import Paciente, {insertarPaciente} from "./Paciente";

const useStyles=makeStyles((theme)=>({
    modal:{
        position: 'absolute',
        width: 600,
        background: '#F5F5F5',
        border: "5px",
        boxShadow: theme.shadows[5],
        padding: "16px 32px 24px",
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    },
    modalDos:{
        position: 'relative',
        width: 600,
        background: '#F5F5F5',
        border: "5px",
        boxShadow: theme.shadows[5],
        padding: "16px 32px 24px",
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    },

}));

/*--------------------------------------*/


const Hero = (props) => {

    const { handleLogout } = props;

    const temp=[];
    const [lstPacientes, setLstPacientes]=useState([]);
    const imprimirPacientes = () =>{
        var prueba=fire.database().ref("Pacientes");
        prueba.on('value', (snapshot)=>{
            snapshot.forEach(function(childSnapshot){
                temp.push(childSnapshot.val());
                console.log(childSnapshot.val());
            });
        });
        setLstPacientes(temp);
    }

    useEffect(()=>{
        imprimirPacientes();
    },[]);


    
    /*----------Modales---------*/
    const styles = useStyles();
    const [modal, setModal]=useState(false);
    const abrirCerrarModal =()=>{
        setModal(!modal);
    }

    const [datos, setDatos]=useState({
        id: '',
        nombre: '',
        sintomatologia: '',
        dosis: '',
        laboratorio: ''
    });

    const enviarInformacion = (event) =>{
        setDatos({
            ...datos,
            [event.target.name] : event.target.value
        })
    }
    
    const bodymodal=(
        <div className={styles.modal}>         
            <div className={styles.contenedorTitulo} align="center"> 
                <h2 className="tituloModal1"> Agregar Registro </h2> 
            </div>
            <form>
                <TextField id="idInsert" name="id" label="Id" onChange={enviarInformacion} className={styles.TextField   }></TextField>
                <br />

                <TextField id="NombreInsert" name="nombre" label="Nombre" onChange={enviarInformacion} className={styles.TextField   }> </TextField>
                <br />

                <TextField id="SintomatologiaInsert" name="sintomatologia" onChange={enviarInformacion} label="Sintomatologia" className={styles.TextField   }> </TextField>
                <br />

                <TextField id="DosisInsert" name="dosis" label="Dosis" onChange={enviarInformacion} className={styles.TextField   }> </TextField>
                <br />

                <TextField id="LaboratorioInsert" name="laboratorio" onChange={enviarInformacion} label="Laboratorio" className={styles.TextField   }> </TextField>
                <br /> <br />

                <div  className="botones"> 
                    <button className="botonGuardar" onClick={()=>insertarPaciente(datos.id, datos.nombre, datos.sintomatologia, datos.dosis, datos.laboratorio)}>  Guardar </button>
                    <button className="botonCancelar" onClick={()=>abrirCerrarModal()}> Cancelar </button>
                </div>
            </form>
        </div>
    )
    /*--------------modal2--------*/
    const [modalDos, setModalDos]=useState(false);
    const abrirCerrarModalDos =()=>{
        setModalDos(!modalDos);
    }
    
    const bodymodaldos = () =>{ 
        <div className={styles.modal}> 
        
            <div className={styles.contenedorTitulo} align="center"> 
                <h2 className="tituloModal1"> Editar Registro </h2> 
            </div>

            <TextField label="Nombre" className={styles.TextField   }> </TextField>
            <br />
            <TextField label="Sintomalogia" className={styles.TextField   }> </TextField>
            <br />
            <TextField label="Dosis" className={styles.TextField   }> </TextField>
            <br />
            <TextField label="Laboratorio" className={styles.TextField   }> </TextField>
            <br /> <br />
            <div  className="botones"> 
                <button className="botonGuardar"> Guardar </button>
                <button className="botonCancelar" onClick={()=>abrirCerrarModalDos()}> Cancelar </button>
            </div>
        </div>
    }


    /*-----------------------*/
    return(
        <>
            {/*Tabla*/}
            <div className="hero"> 
                <section className="hero2">
                    <nav>
                        <button className="botonVolver" onClick={handleLogout}>Volver a inicio de Sesion </button>
                        <img className="logoForja" alt="forjaIcono" src={forjaicono} />
                    </nav>
                </section>
                <section> 
                    <div > <h6 className="tituloCrud"> Crud dosis de vacunacion COVID-19</h6></div>
                    <div> 
                        <div className="contenedor_botones"> 
                            <button className="agregar" onClick={()=>abrirCerrarModal()} > + Agregar </button>
                            <Modal open={modal} onClose={abrirCerrarModal}>
                                {bodymodal}
                            </Modal>
                            <form>
                            
                            <label className="bucarcon">
                               Buscar: <input type="text" buscar="buscar" className="botonBuscar" placeholder="Id" />
                            </label>
                            </form>
                        </div>

                        <div className="contenedor_tabla">
                            <TableContainer className="tablaContenedor"> 
                                <Table className="tabla" > 
                                    <TableHead className="tablacabecera"> 
                                        <TableRow className="tablaRow"> 
                                            <TableCell><h2 className="row"> Id </h2></TableCell>
                                            <TableCell><h2 className="row1">Nombre</h2></TableCell>
                                            <TableCell><h2 className="row1">Sintomatologia</h2></TableCell>
                                            <TableCell><h2 className="row1">Dosis </h2></TableCell>
                                            <TableCell><h2 className="row1">Laboratorio</h2></TableCell>
                                            <TableCell><h2 className="row1">Editar</h2></TableCell>
                                        </TableRow>
                                    </TableHead>

                                    <TableBody className="cuerpoTabla">
                                        {lstPacientes.map(item => {
                                            return(
                                                <TableRow className="tablaRow"> 
                                                    <TableCell><h2 className="row" key="{item.id}"> {item.id} </h2></TableCell>
                                                    <TableCell><h2 className="row1">{item.nombre}</h2></TableCell>
                                                    <TableCell><h2 className="row1">{item.sintomatologia}</h2></TableCell>
                                                    <TableCell><h2 className="row1">{item.dosis}</h2></TableCell>
                                                    <TableCell><h2 className="row1">{item.laboratorio}</h2></TableCell>
                                                    <TableCell><img className="editar" alt="iEditar" src={editar}  onClick={()=>abrirCerrarModalDos()} /></TableCell>
                                                    
                                                </TableRow>
                                            )
                                        }
                                        )}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                    </div>
                </section>
            </div> 
        </> 
    );
}

export default Hero;