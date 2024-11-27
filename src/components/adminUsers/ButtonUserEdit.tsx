import React from "react";
import { ICreateUser } from "../../interfaces/ICreateUser";
import iconoEditar from "../../assets/images/icono_editar.png";

const ButtonUserEdit: React.FC<{ user: ICreateUser, onEdit: (user: ICreateUser) => void}> = ({ user, onEdit }) => {

    return (
        <button className="button-edit-user" onClick={() => onEdit(user)}>
            <img src={iconoEditar} alt="Editar usuario" className="icono-editar-usuario"/>
        </button>
    );
};

export default ButtonUserEdit;