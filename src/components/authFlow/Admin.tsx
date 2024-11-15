import { useNavigate } from 'react-router-dom';
import '../../styles/user.css';
import { useDispatch } from 'react-redux';
import { logoutAction } from '../../states/authSlice';
import { useEffect, useState } from 'react';
import { ICreateUser } from '../../interfaces/ICreateUser';
import { configuracion } from '../../config/appConfiguration';

const AdminPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [users, setUsers] = useState<ICreateUser[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const fetchedUsers: ICreateUser[] = [];
            const range = 2; // Rango de IDs de usuario a consultar

            for (let id = 1; id <= range; id++) {
                try {
                    const result = await fetch(`${configuracion.urlJsonServerBackendUsers}/${id}`);
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

    const handleLogout = () => {
        dispatch(logoutAction());
        navigate('/');
    };

    return (
        <div className='userPage-container'>
            <div className='account-header'>
                <h1>Panel de administración</h1>
                <button className='logout-button' onClick={handleLogout}>Cerrar sesión</button>
            </div>

            <div className='account-content'>
                <div className='historial-compra'>
                    <h2>Historial administrador</h2>
                    <p>Aún no has realizado ningún cambio.</p>
                </div>

                <div className='account-details'>
                    <h2>Detalles de la cuenta</h2>
                    <p><b>Nombre:</b> Admin</p>
                    <p><b>Correo electrónico:</b> admin@gmail.com</p>
                    <p><b>Dirección:</b> Chile</p>
                </div>
            </div>

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
        </div>
    );
};

export default AdminPage;