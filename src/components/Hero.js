import React from 'react';
import '../utils/css/estilos_hero.css';
import { TableContainer , Table , TableHead , TableBody , TableRow , TableCell} from '@material-ui/core';
import forjaicono from '../utils/images/Logo_Forja.png';
import editar from '../utils/images/iconodeeditar.png'
const data= [
    {id: 1000728673 , nombre: 'Geraldine Molina', sintomalogia: 'Dolores de cabeza  y dolor de garganta.', dosis: 'Primera', laboratorio: 'laboratorio Rh' },
    {id: 1008090611 , nombre: 'Natalia Gomez', sintomalogia: 'Tos, dificulatd para respirar y fiebre de 38º', dosis: 'Segunda', laboratorio: 'Cafam' },
    {id: 10738695 , nombre: 'Camilo Arias', sintomalogia: 'Dolores de cabeza y tos.', dosis: 'Primera', laboratorio: 'laboratorio clinico' },
    {id: 101013157 , nombre: 'Andrea Castro', sintomalogia: 'Tos, dificulatd para respirar y fiebre de 38º', dosis: 'Primera', laboratorio: 'laboratorio Rh' },
    {id: 1077895574 , nombre: 'Yamile rincon', sintomalogia: 'Dolores de cabeza con dificultad para respirar.', dosis: 'Ninguna', laboratorio: 'laboratorio clinico' },
    {id: 1055687137 , nombre: 'Samuel Herrera', sintomalogia: 'Tos, dificulatd para respirar y fiebre de 38º', dosis: 'Primera', laboratorio: 'Cafam' },

];


const Hero = (props) => {

    const { handleLogout } = props;

    return(
        <>
            <div className="hero"> 
                <section className="hero2">
                    <nav>
                        <button className="botonVolver" onClick={handleLogout}>Volver a inicio de Sesion </button>
                        <img  className="logoForja" src={forjaicono} />
                    </nav>
                </section>
                <section> 
                    <div > <h6 className="tituloCrud"> Crud dosis de vacunacion COVID-19</h6></div>
                    <div> 
                        <div className="contenedor_botones"> 
                            <button className="agregar"> + Agregar </button>
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
                                            <TableCell><h2 className="row1"> Sintomalogia</h2></TableCell>
                                            <TableCell><h2 className="row1">Dosis </h2></TableCell>
                                            <TableCell><h2 className="row1">Laboratorio</h2></TableCell>
                                            <TableCell><h2 className="row1">Editar</h2></TableCell>
                                        </TableRow>
                                    </TableHead>

                                    <TableBody className="cuerpoTabla"> 
                                        {data.map(celda=>(
                                            <TableRow> 
                                                <TableCell> {celda.id} </TableCell>
                                                <TableCell> {celda.nombre} </TableCell>
                                                <TableCell> {celda.sintomalogia} </TableCell>
                                                <TableCell> {celda.dosis} </TableCell>
                                                <TableCell> {celda.laboratorio} </TableCell>
                                                <TableCell> <img  className="editar" src={editar} /></TableCell>

                                            </TableRow>
                                        
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>



                    </div>
                </section>
            </div> 
        </>
    )
}

export default Hero;