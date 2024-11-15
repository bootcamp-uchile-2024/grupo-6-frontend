import { Link, useNavigate } from 'react-router-dom';
import '../../styles/user.css';
import { useDispatch } from 'react-redux';
import { logoutAction } from '../../states/authSlice';
import { useEffect, useState } from 'react';
import iconoBorrar from '../../assets/images/icono_basurero.png'
import '../../styles/modify_product.css'
import iconoEditar from '../../assets/images/icono_editar.png'
import { configuracion } from '../../config/appConfiguration';
import { IUser } from '../../interfaces/IUser';

const AdminPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [users, setUsers] = useState<IUser[]>([]);
    const [shouldFetch, setShouldFetch] = useState(true); // Controla cuándo obtener la lista de usuarios

    useEffect(() => {
        const fetchUsers = async () => {

                try {
                    const result = await fetch(configuracion.urlJsonServerBackendUsers);
                    if (result.ok) {
                        const usersResponse: IUser[] = await result.json();
                        //fetchedUsers.push(user); // Añadimos cada usuario al array
                        console.log(usersResponse);
                        setUsers(usersResponse); // Guardamos todos los usuarios en el estado
                    }
                } catch (error) {
                    console.error(`Error fetching users`, error);
                }

            setShouldFetch(false); // Desactiva el fetch hasta la próxima actualización
        };

        fetchUsers();
    }, [shouldFetch]);

    const handleLogout = () => {
        dispatch(logoutAction());
        navigate('/');
    };

    const handleDelete = async (idUsuario: number) => {
        const url = configuracion.urlJsonServerBackendUsers.toString().concat(`/${idUsuario}`);
        console.log(url);
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
            }
        });
    
        if (response.ok) {
            setShouldFetch(true); // Activa el fetch para actualizar la lista de usuarios
        } else {
            console.error('Error eliminando el usuario');
        }
    }

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

            <h2>Lista de usuarios</h2>
            <div className="admin-user-list-container">
                <table className="admin-user-table">
                    <thead>
                        <tr className="admin-userlist-item-detail-tr">
                            <th className="admin-userlist-item-detail-th">id</th>
                            <th className="admin-userlist-item-detail-th">Nombre</th>
                            <th className="admin-userlist-item-detail-th">Email</th>
                            <th className="admin-userlist-item-detail-th">Modificar</th>
                            <th className="admin-userlist-item-detail-th">Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr className="admin-userlist-item-detail-tr"  key={user.id}>
                                <td className="admin-userlist-item-detail-td" >{user.id}</td>
                                <td className="admin-userlist-item-detail-td" >{`${user.nombre}  ${user.apellido_paterno}  ${user.apellido_materno}`}</td>
                                <td className="admin-userlist-item-detail-td" >{user.correo_electronico}</td>


                                <td className="admin-userlist-item-detail-td" >
                                    <Link to={`/admin/edit-user/${user.id}`}>
                                        <button className="shoppingcart-button-delete">
                                            <img src={iconoEditar} alt="Editar libro" className="icono-editar" />
                                        </button>
                                    </Link>
                                </td>


                                <td className="admin-userlist-item-detail-td" ><button className="shoppingcart-button-delete" onClick={() => handleDelete(user.id)}>
                                    <img src={iconoBorrar} alt="Borrar libro" className="icono-basurero" />
                                </button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminPage;