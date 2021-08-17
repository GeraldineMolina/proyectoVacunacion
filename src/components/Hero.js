import React, { useState, useEffect } from 'react';
import '../utils/css/estilos_hero.css';
import { TableContainer,
         Table , 
         TableHead , 
         TableBody , 
         TableRow , 
         TableCell,
         TextField,
         Modal,
         Button,
        MenuItem
        }
    from '@material-ui/core';
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
        borderRadius: "10px",
        boxShadow: theme.shadows[5],
        padding: "0px",
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

    const {
        handleLogout
    } = props;


    /*----Imprimir pacientes----*/
    const temp=[];/* arreglo temporal para actualizar la lista de pacientes */
    const [lstPacientes, setLstPacientes]=useState([]);

    /* toma de la base de datos la informacion de cada paciente y la guarda en la variable lstPacientes */
    const imprimirPacientes = () =>{
        var prueba=fire.database().ref("Pacientes");
        prueba.on('value', (snapshot)=>{
            snapshot.forEach(function(childSnapshot){
                temp.push(childSnapshot.val());
            });
        });
        setLstPacientes(temp);
    }

    /* Actualiza los datos en cada render */
    useEffect(()=>{
        imprimirPacientes();
    },[]);


    /*-----------Metodos busqueda de paciente------*/
    const [busqueda, setBusqueda]=useState({
        id: ''
    });

    /* actualiza el valor del campo de busqueda cada que se escribe una letra */
    const enviarBusqueda = (event) =>{
        setBusqueda({
            ...busqueda,
            [event.target.name] : event.target.value
        });
    }

    /* busca en la base de datos el registro con el id indicado y actualiza la lstPacientes */
    const imprimirBusqueda = (valor) =>{
        var prueba=fire.database().ref("Pacientes/"+valor);
        const busq=[];
        prueba.on('value', (snapshot)=>{
            if(snapshot.val()===null){
                alert("El valor de busqueda no se encuentra");
            }else{
                busq.push(snapshot.val());
            }
        });
        setLstPacientes(busq);
    }

    /*---Editar Paciente---*/
    const[pacienteActual, setPacienteActual]=useState({
        id: '',
        nombre: '',
        sintomatologia: '',
        dosis: '',
        laboratorio: ''
    });

    const enviarPacienteActual=(id, nombre, sintomatologia, dosis, laboratorio)=>{
        const p={
            id: id,
            nombre: nombre,
            sintomatologia: sintomatologia,
            dosis: dosis,
            laboratorio: laboratorio
        }
        setPacienteActual(p);
        setEditarInfo(p);
        abrirCerrarModalDos();
    }

    const [editarInfo, setEditarInfo]=useState({
        id: '',
        nombre: '',
        sintomatologia: '',
        dosis: '',
        laboratorio: ''
    });

    /* actualiza el valor de los campos del modal editar cada vez que se escribe una letra */
    const editarInformacion = (event) =>{
        setEditarInfo({
            ...editarInfo,
            [event.target.name] : event.target.value
        })
    }


    
    /*----------Modales---------*/

    /*-----------modal1------------*/
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
    
    /* actualiza el valor de los campos del modal agregar cada vez que se escribe una letra */
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
                <TextField  style={{margin: 10, width:550}} size="small" id="outlined-basic" variant="outlined" name="id" label="Id" onChange={enviarInformacion} className={styles.TextField   }></TextField>
                <br />

                <TextField  style={{margin: 10, width:550}} size="small" id="NombreInsert" variant="outlined" name="nombre" label="Nombre" onChange={enviarInformacion} className={styles.TextField   }> </TextField>
                <br />

                <TextField  style={{margin: 10, width:550}}  size="small" id="SintomatologiaInsert"  variant="outlined" name="sintomatologia" onChange={enviarInformacion} label="Sintomatologia" className={styles.TextField   }> </TextField>
                <br />

                <TextField  style={{margin: 10, width:550}} size="small" id="DosisInsert" variant="outlined" name="dosis" label="Dosis" onChange={enviarInformacion} className={styles.TextField   }> </TextField>
                <br />

                <TextField  style={{margin: 10, width:550}} size="small" id="LaboratorioInsert" variant="outlined" name="laboratorio" onChange={enviarInformacion} label="Laboratorio" className={styles.TextField   }> </TextField>
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
    
    const bodymodaldos = (
        <div className={styles.modal}>         
            <div className={styles.contenedorTitulo} align="center"> 
                <h2 className="tituloModal1"> Editar Registro </h2> 
            </div>
            <form>

                <TextField defaultValue={pacienteActual.nombre} style={{margin: 10, width:550}} size="small" variant="outlined" id="NombreInsert" name="nombre" label="Nombre" onChange={editarInformacion} className={styles.TextField   }> </TextField>
                <br />

                <TextField defaultValue={pacienteActual.sintomatologia} style={{margin: 10, width:550}} size="small"  variant="outlined" id="SintomatologiaInsert" name="sintomatologia" onChange={editarInformacion} label="Sintomatologia" className={styles.TextField   }> </TextField>
                <br />

                <TextField defaultValue={pacienteActual.dosis} style={{margin: 10, width:550}} size="small"  variant="outlined" id="DosisInsert" name="dosis" label="Dosis" onChange={editarInformacion} className={styles.TextField   }> </TextField>
                <br />

                <TextField defaultValue={pacienteActual.laboratorio} style={{margin: 10, width:550}} size="small"  variant="outlined" id="LaboratorioInsert" name="laboratorio" onChange={editarInformacion} label="Laboratorio" className={styles.TextField   }> </TextField>
                <br /> <br />

                <div  className="botones"> 
                    <button className="botonGuardar" onClick={()=>insertarPaciente(pacienteActual.id, editarInfo.nombre, editarInfo.sintomatologia, editarInfo.dosis, editarInfo.laboratorio)}>  Guardar </button>
                    <button className="botonCancelar" onClick={()=>abrirCerrarModalDos()}> Cancelar </button>
                </div>
            </form>
        </div>
    )


    /*-----------------------*/
    return(
        <>
            {/*Tabla*/}
            <div className="cuerpoHero">
                <div className="hero"> 
                    <section className="hero2">
                        <nav>
                            <button className="botonVolver" onClick={handleLogout}>Volver a inicio de Sesion </button>
                            <img className="logoForja" alt="forjaIcono" src={forjaicono} />
                        </nav>
                    </section>
                    <section> 
                        <div className="contenedorTitul">
                        <div > <h6 className="tituloCrud"> Crud dosis de vacunacion COVID-19</h6></div>
                        </div>
                        <div className="contenedorSeccion"> 
                            <div className="contenedor_contenedores">
                                <div className="contenedor_botones1"> 
                                    <button className="agregar" onClick={()=>abrirCerrarModal()} > + Agregar </button>
                                    <button className="recargarDatos" onClick={()=>imprimirPacientes()}> Cargar datos </button>
                                    <Modal open={modal} onClose={abrirCerrarModal}>
                                        <div>
                                        {bodymodal}
                                        </div>
                                    </Modal>
                                    
                                    
                                    
                                </div>
                                <div className="contenedor_botones2">
                                    
                                    <label className="bucarcon">
                                    Buscar: <input type="text" id="id" name="id" buscar="buscar" className="botonBuscar" placeholder="Id" onChange={enviarBusqueda}/>
                                    </label>
                                    <Modal open={modalDos} onClose={abrirCerrarModalDos}>
                                        <div>
                                        {bodymodaldos}
                                        </div>
                                    </Modal>
                                    <button className="buscarBoton" onClick={()=>imprimirBusqueda(busqueda.id)}>Buscar</button>
                                    <button className="limpiarBoton" onClick={()=>imprimirPacientes()}>Limpiar busqueda</button>    
                                </div>
                            </div>
                            <div className="contenedor_tabla">
                                <TableContainer className="tablaContenedor"> 
                                    <Table className="tabla" > 
                                        <TableHead className="tablacabecera"> 
                                            <TableRow className="tablaRow"> 
                                                <TableCell><h2 className="row" id="tituloTabla"> Id </h2></TableCell>
                                                <TableCell><h2 className="row1" id="tituloTabla">Nombre</h2></TableCell>
                                                <TableCell><h2 className="row1" id="tituloTabla">Sintomatologia</h2></TableCell>
                                                <TableCell><h2 className="row1" id="tituloTabla">Dosis </h2></TableCell>
                                                <TableCell><h2 className="row1" id="tituloTabla">Laboratorio</h2></TableCell>
                                                <TableCell><h2 className="row1" id="tituloTabla">Editar</h2></TableCell>
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
                                                        <TableCell><img className="editar" alt="iEditar" src={editar}  onClick={()=>enviarPacienteActual(item.id, item.nombre, item.sintomatologia, item.dosis, item.laboratorio)} /></TableCell>

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
            </div>
        </> 
    );
}

export default Hero;
