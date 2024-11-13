import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutAction } from '../../states/authSlice';
import UserList from '../adminUsers/UserList';
import '../../styles/user.css';
import '../../styles/user_list.css'

const AdminPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logoutAction());
        navigate('/');
    }

    return (
        <div className='userPage-container'>
            <div className='account-header'>
                <h1>Panel de administración</h1>
                <button className='logout-button' onClick={handleLogout}>Cerrar sesión</button>
            </div>

                <div className='account-details'>
                    <h2>Detalles de la cuenta</h2>
                    <p><b>Nombre:</b> Admin</p>
                    <p><b>Correo electrónico:</b> admin@gmail.com</p>
                    <p><b>Dirección:</b> Chile</p>
                </div>

                <div className='user-list-section'>
                    <UserList />
                </div>

        </div>
    );
};

export default AdminPage;