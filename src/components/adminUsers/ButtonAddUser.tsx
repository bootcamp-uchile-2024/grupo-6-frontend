import { useDispatch } from "react-redux";
import { addUsers } from "../../states/userSlice";
import iconoAgregarUsuario from "../../assets/images/icono_Add_usuario.png";
import { ICreateUser } from "../../interfaces/ICreateUser";
import { useNavigate } from "react-router-dom";

const ButtonAddUser = ({ newUser }: { newUser: Omit<ICreateUser, 'id' | 'contrasena'>}) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleAddUser = () => {
        if (newUser.nombres && newUser.correoElectronico) {
            dispatch(addUsers(newUser as ICreateUser));
            console.log("Usuario agregado:", newUser);
            navigate(`/admin/user/${newUser.nombres}`); // Redirige a la página de detalles del usuario agregado
        }

        else {
            console.error("Faltan datos para agregar el usuario.");
        }
    };

    return (
        <button className="button-add-user" onClick={handleAddUser}>
            <img src={iconoAgregarUsuario} alt="Agregar usuario" className="icono-agregar-usuario" />
        </button>
    );
};

export default ButtonAddUser;