import React, { Fragment, useEffect, useState } from 'react';
import ClienteAxios from '../../config/axios';
import { useParams } from 'react-router-dom';

function EditarAlumno(){
    
    let params = useParams();
    console.log(params.id);

    const[carreras, guardarCarrera] =useState ([]);
    //const[editaralumno, guardareditarAlumno] =useState ([]);
    const [alumno, guardareditarAlumno] = useState({
        action :'update',
        carrera: '', 
        nombre: '', 
        apellido:'', 
        edad:'', 
        email:'', 
        estado:'',
        id:''+params.id+''    
    });

    const ConsultarAPI = async() => {
        const CarreraConsulta = await ClienteAxios.get('/carreras');
        const AlumnoConsulta = await ClienteAxios.get('/alumnos/'+params.id+'');
    
        guardarCarrera(CarreraConsulta.data);
        guardareditarAlumno(AlumnoConsulta.data[0]);  
    }
    useEffect ( ()=>{
        ConsultarAPI();
    },[]);

    const actualizarState = e =>{
        guardareditarAlumno({
            ...alumno,
            [e.target.name]: e.target.value
        })
    }

    const ModificarAlumno = e =>{
        e.preventDefault();
        ClienteAxios.post('/alumnos', alumno).then(res=>{
            alert("Alumno Modificado");
            window.location.reload();
            console.log(res);
        });
    }

    return (
        <Fragment>
        <h2>Editar Alumno</h2>
        
            <form onSubmit={(ModificarAlumno)}>
                <legend>Llena todos los campos</legend>

                <div class="campo">
                    <label>Nombre:</label>
                    <input type="text" placeholder="Nombre Alumno" name="nombre" onChange={actualizarState} value={alumno.nombre}/>
                </div>

                <div class="campo">
                    <label>Apellido:</label>
                    <input type="text" placeholder="Apellido Alumno" name="apellido" onChange={actualizarState} value={alumno.apellido}/>
                </div>
            
                <div class="campo">
                    <label>Carrera:</label>
                    <select name="carrera" onChange={actualizarState}>
                        {carreras.map(carrera=>
                            <option value={carrera.ID_Carrera} selected={carrera.ID_Carrera === alumno.carrera}>
                                {carrera.Carrera}
                            </option>
                        )}
                    </select>
                </div>

                <div class="campo">
                    <label>Email:</label>
                    <input type="email" placeholder="Email Alumno" name="email" onChange={actualizarState} value={alumno.email}/>
                </div>

                <div class="campo">
                    <label>Edad:</label>
                    <input type="number" placeholder="Edad Alumno" name="edad" onChange={actualizarState} value={alumno.edad}/>
                </div>

                <div class="campo">
                    <label>Estado</label>

                    <select name="estado" onChange={actualizarState}>
                        <option value="1" selected={alumno.estado === 1}>Alumno Inscrito</option>
                        <option value="2" selected={alumno.estado === 2}>Alumno Baja Temporal</option>
                        <option value="3" selected={alumno.estado === 3}>Alumno Baja Definitiva</option>
                    </select>
                </div>

                <div class="enviar">
                        <input type="submit" class="btn btn-azul" value="Actualizar Información Alumno"/>
                </div>

            </form>
        </Fragment>
    )
}
export default EditarAlumno;