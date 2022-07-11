{/* Script que contiene funciones "comunes" */}

{/* Función que devuelve un string semi-capitalizado */}
export function Capitalize(szString)
{
    {/* Solo convierto el primer string a upper y devuelvo lo demás sin el primer cáracter (obviamente) */}
    return szString.charAt(0).toUpperCase() + szString.slice(1);
}

export function GetCurrentDate()
{
    // Creo un puntero de fecha
    var today = new Date();
    
    {/*
        Devuelvo hora y fecha
        El mes debo sumarle 1 porque enero empieza en 0
    */}
    
    return today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds() + ' - ' + today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
}

{/* Función para agregar/remover un detalle al ingresar valores en los inputs */}
export function InputErrorText(pRef, bSet)
{
    // Obtenemos la ID
    var pElement = document.getElementById(pRef.current.getAttribute('id'));

    // Chequeo de seguridad por si el elemento pasado es inválido
    if(pElement == null)
    {
        // Log
        console.log("El elemento pasado es nulo: " + pRef);
        return;
    }

    {/* Seteamos invalid feedback, removemos si no es */}
    if(bSet)
        pElement.classList.add("is-invalid");
    else
        pElement.classList.remove("is-invalid");
}

export function InputChangeIDText(szID, szValue)
{
    var pElement = document.getElementById(szID);

    // Chequeo de seguridad por si el elemento pasado es inválido
    if(pElement == null)
    {
        // Log
        console.log("El elemento pasado es nulo: " + szID);
        return;
    }

    // Cambiamos el valor
    pElement.innerHTML = szValue;
}