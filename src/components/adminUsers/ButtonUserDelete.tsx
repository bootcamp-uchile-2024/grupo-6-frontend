import React from "react";
import { ICreateUser } from "../../interfaces/ICreateUser";
import iconoEliminar from "../../assets/images/icono_basurero.png";

const ButtonUserDelete: React.FC<{ user: ICreateUser, onDelete: (id: string) => void }> = ({ user, onDelete}) => {
    return (
        <button onClick={() => onDelete(user.id.toString())}>
            <img src={iconoEliminar} alt="Borrar usuario" className="icono-eliminar-usuario"/>
        </button>
    );
};

export default ButtonUserDelete;