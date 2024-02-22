import React, { useEffect, useState }  from 'react';
import ClienteAxios from '../../config/axios';

function Alumnos(){
const[alumnos, guardarAlumnos] =useState ([]);
const ConsultarAPI = async() => {
    const AlumnosConsulta = await ClienteAxios.get('/alumnos');

    guardarAlumnos(AlumnosConsulta.data);
    console.log(alumnos);

}
useEffect ( ()=>{
    ConsultarAPI();
},[]);

return (
    <ul class="listado-alumnos">
        {alumnos.map(alumno =>
            <li class = "alumno">
                <div class= "info-alumno">
                    <p class= "nombre">{alumno.Nombre}</p>
                    <p class= "carrera">{alumno.Carrera}</p>
                    <p>{alumno.Email}</p>
                    <p>{alumno.Edad}</p>
                </div>
                <div class="acciones">
                <a href="#" class="btn btn-azul">
                        <i class="fas fa-pen-alt"></i>
                        Editar Alumno
                    </a>
                    <button type="button" class="btn btn-rojo btn-eliminar">
                        <i class="fas fa-times"></i>
                        Eliminar Alumno
                    </button>
                </div>
            </li>
            )}
    </ul>
)
}
export default Alumnos;