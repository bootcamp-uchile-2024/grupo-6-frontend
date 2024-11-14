import React, { useEffect, useState } from "react";
import { ICreateUser } from "../../interfaces/ICreateUser";
import ButtonUserDelete from "./ButtonUserDelete";
import ButtonUserEdit from "./ButtonUserEdit";
import '../../styles/user_list.css'


const UserList = () => {

    const [users, setUsers] = useState<ICreateUser[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const fetchedUsers: ICreateUser[] = [];
            const range = 2; // Rango de IDs de usuario a consultar

            for (let id = 1; id <= range; id++) {
                try {
                    const result = await fetch(`/create-user-back/${id}`);
                    if (result.ok) {
                        const user: ICreateUser = await result.json();
                        fetchedUsers.push(user); // Añadimos cada usuario al array
                    }
                } catch (error) {
                    console.error(`Error fetching user with ID ${id}:`, error);
                }
            }
            setUsers(fetchedUsers); // Guardamos todos los usuarios en el estado
        };

        fetchUsers();
    }, []);


    /* const dispatch = useDispatch<AppDispatch>();
    
    // Para seleccionar el estado de los usuarios desde Redux
    const { users, loading, error } = useSelector((state: any) => state.users);
    
    console.log(users);
    
    // Para llamar a la acción 'fetchUser' cuando el componente se monta
    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]); */

    /* const handleDeleteUser = (id: string) => {
        dispatch(deleteUser(id));
    }
    
    const handleEditUser = (user: ICreateUser) => {
        dispatch(updateUser(user));
    }; */

    return (
        <div className="contenedor">
        <table>
            <thead>
                <tr>
                    <th>id</th>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Control</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user) => (
                    <tr key={user.idUsuario}>
                        <td>{user.idUsuario}</td>
                        <td>{`${user.nombres} ${user.apellidoPaterno} ${user.apellidoMaterno}`}</td>
                        <td>{user.correoElectronico}</td>
                        <td><button id="boton-eliminar">Eliminar</button></td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
    )
};


export default UserList;