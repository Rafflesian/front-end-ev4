import React from "react";
import buttonClick from './button';

const RenderForm = () => 
{
    const hSubmit = (n) => 
    {

        return true;
    }

    return (
        <form className="mt-2 formPadding" onSubmit={hSubmit}>
            <div className="mb-3">
                <label className="form-label">Nombre</label>
                <input className="form-control" placeholder="ASD"/>
            </div>
            <button type="submit" className="btn btn-outline-danger btn-small">Botón</button>
        </form>
    );
}

export default RenderForm;