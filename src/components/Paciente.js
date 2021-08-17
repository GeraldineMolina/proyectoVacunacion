
import fire from '../firebase-config';

import '../utils/css/estilos_hero.css';


export default function nada(){
    
}


/* Metodo para insertar pacientes en firebase */
export const insertarPaciente = (id, nombre, sintomatologia, dosis, laboratorio)=>{
    if(id!=="" && nombre!=="" && sintomatologia!=="" && dosis!=="" && laboratorio!==""){
        fire.database().ref("Pacientes/"+id).set({
            id: id,
            nombre: nombre,
            sintomatologia: sintomatologia,
            dosis: dosis,
            laboratorio: laboratorio
        });
    }else{
        alert("Ingrese la informacion completa por favor");
    }
}
 


