import { useDispatch } from "react-redux";
import { deleteUser } from "../../states/userSlice";
import iconoBorrar from '../../assets/images/icono_basurero.png';
import { IUser } from "../../interfaces/IUser";

const ButtonUserDelete = ({ user }: { user: IUser }) => {
    const dispatch = useDispatch();

    const handleUserDelete = () => {
        if (user) {
            dispatch(deleteUser(user.correoElectronico));
            console.log("Usuario a eliminar:", user);
        }

        else {
            console.error("El usuario no se puede eliminar.");
        }
    };

    return (
        <button className="button-delete-user" onClick={handleUserDelete}>
            <img src={iconoBorrar} alt="Borrar usuario" className="icono-basurero-usuario" />
        </button>
    );
};

export default ButtonUserDelete;