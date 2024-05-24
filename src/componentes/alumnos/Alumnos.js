import React, { Fragment, useEffect, useState } from 'react';
import ClienteAxios from '../../config/axios';
import {Link} from 'react-router-dom';

function Alumnos() {
    const [alumnos, guardarAlumnos] = useState([]);
    const ConsultarAPI = async () => {
        const AlumnosConsulta = await ClienteAxios.get('/alumnos');

        guardarAlumnos(AlumnosConsulta.data);
        console.log(alumnos);

    }
    useEffect(() => {
        ConsultarAPI();
    }, []);

    const deleteAlumno = async (id) => {
        try {
            alert("Alumno Eliminado");
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Fragment>
            <h2>Alumnos</h2>
            <Link to={"/nuevo-alumno"} class="btn btn-verde nvo-alumno"><i class="fas fa-plus-circle"></i>
                Nuevo alumno
            </Link>

            <ul class="listado-alumnos">
                {alumnos.map(alumno =>
                    <li class="alumno" key={alumno.ID_Alumno}>
                        <div class="info-alumno">
                            <p class="nombre">{alumno.Nombre} {alumno.Apellido}</p>
                            <p class="carrera">{alumno.Carrera}</p>
                            <p>{alumno.Email}</p>
                            <p>Edad: {alumno.Edad}</p>
                        </div>
                        <div class="acciones">
                            <Link to={"/editaralumno/" + alumno.ID_Alumno} class="btn btn-azul">
                                <i class="fas fa-pen-alt"></i>
                                Editar Alumno
                            </Link>
                            <button type="button" class="btn btn-rojo btn-eliminar" onClick={() => deleteAlumno(alumno.ID_Alumno)}>
                                <i class="fas fa-times"></i>
                                Eliminar Alumno
                            </button>
                        </div>
                    </li>
                )}
            </ul>
        </Fragment>
    )
}
export default Alumnos;