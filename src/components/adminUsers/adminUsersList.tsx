import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, deleteUserByCorreoElectronico } from '../../states/userList';
import { ICreateUser } from '../../interfaces/ICreateUser';
import { AppDispatch, RootState } from '../../states/store';

const adminUsersList: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const { users, loading, error } = useSelector((state: RootState) => state.users || {});

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    const handleDelete = (correoElectronico: string) => {
        dispatch(deleteUserByCorreoElectronico(correoElectronico));
    };

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>{`Error: ${error}`}</p>;

    return(
        <div>
            <h2>Gestión de usuarios</h2>
            <ul>
                {users.map((user: ICreateUser) => (
                    <li key={user.correoElectronico}>
                        {user.nombres}
                        {user.apellidoPaterno}
                        {user.apellidoMaterno} - {user.correoElectronico}
                        <button onClick={() => handleDelete(user.correoElectronico)}>Eliminar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default adminUsersList;