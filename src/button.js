import React from "react";

export function buttonClick()
{
    alert("aeiou");
}

export default function RenderButton(props)
{
    return (
        <button type="submit" className="btn btn-outline-danger btn-small">Botón</button>
    );
}