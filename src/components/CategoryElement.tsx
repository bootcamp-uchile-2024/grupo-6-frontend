import { useEffect, useState } from "react";

interface CategoryProps {
    idGenero: string;
    nombreGenero: string;
    subGeneros: string[];
}

//Revisar porque si se llama a la API de back, pero no esta mostrando los datos
export const CategoryElement = (props: CategoryProps) => {
    const [state, setState] = useState('');
    useEffect(() => {

    });

    return (
        <div className="checkbox-container">
            <input id={props.nombreGenero} type="checkbox" defaultValue={state} onChange={(e) => setState(e.target.value)} />
            <label htmlFor={props.nombreGenero}>{props.nombreGenero}</label>
        </div>

    )
}

export default CategoryElement;