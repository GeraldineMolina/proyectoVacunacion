
import fire from '../firebase-config';

import '../utils/css/estilos_hero.css';


export default function nada(){
    
}

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


