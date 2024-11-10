import { useNavigate } from 'react-router-dom';
import '../styles/user.css';
import { logout } from '../services/loginService';

const UserPage = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    }

    return (
        <div className='userPage-container'>

            <div className='account-header'>
                <h1>Cuenta</h1>
                <button className='logout-button' onClick={handleLogout}>Cerrar sesión</button>
            </div>

            <div className='account-content'>
                <div className='historial-compra'>
                    <h2>Historial de pedido</h2>
                    <p>Aún no has realizado ningún pedido.</p>
                </div>

                <div className='account-details'>
                    <h2>Detalles de  la cuenta</h2>
                    <p><b>Nombre:</b> Usuario</p>
                    <p><b>Correo electrónico:</b> usuario@gmail.com</p>
                    <p><b>Dirección:</b> Chile</p>
                </div>
            </div>

        </div>
    );
};

export default UserPage;