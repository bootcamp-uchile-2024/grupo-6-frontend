import { useNavigate } from 'react-router-dom';
import '../../styles/user.css';
import { logout } from '../../services/loginService';
import { useDispatch } from 'react-redux';
import { logoutAction } from '../../states/authSlice';

const AdminPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        logout();
        dispatch(logoutAction());
        navigate('/');
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
        </div>
    );
};

export default AdminPage;