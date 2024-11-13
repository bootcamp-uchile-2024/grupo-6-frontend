import { useDispatch } from "react-redux";
import { updateUser } from "../../states/userSlice";
import iconoEditar from "../../assets/images/icono_editar.png";
import { IUser } from "../../interfaces/IUser";
import { useNavigate } from "react-router-dom";

const ButtonUserEdit = ({ user }: { user: IUser}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleUserEdit = () => {
        if (user) {
            dispatch(updateUser(user));
            console.log("Usuario a editar:", user);
            navigate(`/admin/edit/user/${user.id}`); // Redirige a la página de editar usuario
        }
        
        else { 
            console.error("El usuario no se puede editar.");
        }
    };

    return (
        <button className="button-edit-user" onClick={handleUserEdit}>
            <img src={iconoEditar} alt="Editar usuario" className="icono-editar-usuario"/>
        </button>
    );
};

export default ButtonUserEdit;