import React, { Fragment, useEffect, useRef, useState } from "react";
import App from "./App";
import {App_Item} from './app_item';
import {v4 as uuid} from 'uuid';
import * as common from './common';

export function App_List()
{
    const TareaKey = "_app_tarea_key";
    const [Tareas, setTareas] = useState([]);

    const Title = useRef();
    const Descripcion = useRef();
    const bWarning = useRef();

    useEffect(() =>
    {
        const TareaStorage = JSON.parse(localStorage.getItem(TareaKey));
        console.log(TareaStorage);

        if(TareaStorage != null)
        {
            setTareas((PreTareas) => 
            {
                return [...PreTareas, ...TareaStorage];
            });
        }
    }, []);

    useEffect(() => 
    {
        localStorage.setItem(TareaKey, JSON.stringify(Tareas));
    }, [Tareas]);

    function TareaAdd()
    {
        var szTitle = Title.current.value;
        var szDescripcion = Descripcion.current.value;
        const bWarn = bWarning.current.checked;

        // Removemos los espacios de principio y fin
        szDescripcion = szDescripcion.trim();
        
        // Sigue vacío
        if(szDescripcion == "")
        {
            // Seteamos el campo en rojo como inválido
            common.InputErrorText(Descripcion, true);

            // Cambiamos el valor del texto de abajo
            common.InputChangeIDText("TareaDescBelowID", "La descripción está vacía");
            return;
        }
        
        // Capitalizamos el string
        szDescripcion = common.Capitalize(szDescripcion);

        // Ya existe esta descripción
        if(TareaExists(szDescripcion))
        {
            // Seteamos el campo en rojo como inválido
            common.InputErrorText(Descripcion, true);
            
            // Cambiamos el valor del texto de abajo
            common.InputChangeIDText("TareaDescBelowID", "La descripción ya existe, intenta con otro");
            return;
        }
        
        // Removemos los espacios del principio y fin
        szTitle = szTitle.trim();

        // No hay título correspondiente, por defecto quedará como "Sin Título"
        // Conste que en las instrucciones de la evaluación dice que solo la descripción es obligatoria
        if(szTitle == "")
            szTitle = "Sin título";

        // "Capitalizamos"
        szTitle = common.Capitalize(szTitle);
        
        // Quitamos el efecto de campo rojo y reseteamos el texto de abajo
        common.InputErrorText(Descripcion, false);
        common.InputChangeIDText("TareaDescBelowID", "");

        // Estructura de la clase    
        const pTarea = 
        {
            id: uuid(),
            title: szTitle,
            desc: szDescripcion,
            warning: bWarn,
            date: common.GetCurrentDate()
        }

        setTareas((PreTareas) => 
        {
            return [...PreTareas, pTarea];
        })
    }

    function TareaReset()
    {
        // Limpiamos el local storage
        localStorage.clear();
        
        // Reiniciamos el array de tareas
        setTareas(() => { return []; });

        // Limpiamos los inputs
        var pElement;

        if((pElement = document.getElementById("TareaTitleID")) != null)
            pElement.value = "";

        if((pElement = document.getElementById("TareaDescID")) != null)
            pElement.value = "";

        if((pElement = document.getElementById("TareaBoxID")) != null)
            pElement.checked = false;
    }

    function TareaExists(pValue)
    {
        // Devuelve verdadero si en el array existe una descripción igual
        return Tareas.some(function (pElement) { return pElement.desc === pValue; } );
    }

    return (
    <Fragment>

        {/* Contenedor principal */}
        <div className="container m-2">

        {/* Header mostrando el título de la webapp y las tareas ingresadas */}
        <h2>Listado de Tareas / {Tareas.length} ingresados</h2>
            
        {/* Input empaquetado margen top & bottom: 2 */}
        <div className='input-group mt-2 mb-2'>

            {/* Inputs principales con márgenes 1px */}
            <input ref={Title} type="text" id="TareaTitleID" className="form-control m-1" placeholder='Título (opcional)'/>

            {/* Input que mostrará un "tooltip" erróneo si algo fue mal */}
            <div className="col">
                <input ref={Descripcion} id="TareaDescID" type="text" className="form-control m-1" placeholder="Descripción" aria-describedby="TareaDescID" required/>
                <div className="invalid-tooltip" id="TareaDescBelowID"></div>
            </div>        

            {/* Check box para declarar lo que se va a ingresar si es importante o no*/}
            <div className="form-check m-2">
                <input ref={bWarning} className="form-check-input" type="checkbox" id="TareaBoxID"/>
                <label className="form-check-label" htmlFor="TareaBoxID">Importante</label>
            </div>

            {/*
                Botones para:
                - Agregar tareas
                - Reiniciar lista
            */}
            
            <button onClick={TareaAdd} className='btn btn-success mt-1 mb-1 me-2'>+</button>
            <button onClick={TareaReset} className="btn btn-outline-danger mt-1 mb-1">Limpiar Tareas</button>

        </div>


        <div className="row">
            <ul className="notes">
                {Tareas.map((item) => <App_Item key={item.id} titulo={item.title} desc={item.desc} warn={item.warning} timestamp={item.date}/>)}                
            </ul>
        </div>

        </div>

    </Fragment>
    );
}