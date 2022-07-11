import React, { Fragment } from "react";
import * as common from './common';

/* Función que mantiene el color de la clase */
function List_Class(bWarning)
{
    {/*
        Devuelvo un string, dependiendo si es importante o no
        Es importante ? nota de papel roja : nota blanca
    */};

    return bWarning ? "list-group-item list-group-item-danger" : "list-group-item";
}

/* Bool exclusivo de la función, si lo creo dentro se libera al terminar la función (flujo lógico) */
var bLast = false;

function Div_Class()
{
    {/* Roto el bool */}
    bLast = !bLast;

    {/* Activo ? rotación negativa : rotación positiva */}
    return bLast ? "rotate-n" : "rotate-p";
}

export function App_Item(props)
{
    {/* Solo devuelvo un fragmento*/}
    return (
        <Fragment>

        {/* Creo otro div con una rotación cambiable */}
        <div className={Div_Class()}>
            
            {/* Creo un item de lista, chequeando si tiene el importante activo*/}
            <li className={List_Class(props.warn)}>

                {/* Un pequeño detalle: Mostrar la fecha en el que se agregó */}
                <small>{props.timestamp}</small>

                {/* Título header 4 y párrafo */}
                <h4>{props.titulo}</h4>
                <p>{props.desc}</p>
            
            </li>

        </div>

        </Fragment>
    )
}