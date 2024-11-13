import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../states/userSlice";
import { ICreateUser } from "../../interfaces/ICreateUser";
import ButtonUserDelete from "./ButtonUserDelete";
import ButtonUserEdit from "./ButtonUserEdit";
import { AppDispatch } from "../../states/store";
import '../../styles/user_list.css'

const UserList: React.FC = () => {

    const dispatch = useDispatch<AppDispatch>();

    // Para seleccionar el estado de los usuarios desde Redux
    const { users, loading, error } = useSelector((state: any) => state.users);

    // Para llamar a la acción 'fetchUser' cuando el componente se monta
    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    return (
        <div className="admin-user-list-container">
            <h2>Listado de usuarios</h2>

            {/* Mensaje de error */}
            {error && <p className="error">{error}</p>}

            {/* Mensaje de carga */}
            {loading ? (
                <p>Cargando usuarios...</p>
            ) : (

                <table className="admin-user-table">

                    <thead>
                        <tr className="admin-userlist-item-detail-tr">
                            <th className="admin-userlist-item-detail-th">Nombres</th>
                            <th className="admin-userlist-item-detail-th">Apellido materno</th>
                            <th className="admin-userlist-item-detail-th">Apellido paterno</th>
                            <th className="admin-userlist-item-detail-th">Correo electrónico</th>
                            <th className="admin-userlist-item-detail-th">Editar</th>
                            <th className="admin-userlist-item-detail-th">Eliminar</th>
                        </tr>
                    </thead>

                    <tbody className='admin-userlist-item-detail'>
                        {users.length > 0 ? (
                            users.map((user : ICreateUser) => (
                                <tr key={user.id} className="admin-userlist-item-detail-tr">

                                    <td>{user.nombres}</td>
                                    <td>{user.correoElectronico}</td>
                                    <td>{user.apellidoMaterno}</td>
                                    <td>{user.apellidoPaterno}</td>
                                    <td>
                                        <ButtonUserEdit user={user} />
                                    </td>
                                    <td>
                                        <ButtonUserDelete user={user} />
                                    </td>

                                </tr>
                            ))
                        ) : (

                            <tr>
                                <td colSpan={6}>No hay usuarios disponibles</td>
                            </tr>
                        )}
                    </tbody>

                </table>
            )}
        </div>
    );
};

export default UserList;