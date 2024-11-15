import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { configuracion } from '../../config/appConfiguration';

const AdminUserModify = () => {
    const { idUsuario } = useParams();
/*     const navigate = useNavigate();
 */    const [userData, setUserData] = useState({
        nombres: '',
        apellidoPaterno: '',
        apellidoMaterno: '',
        correoElectronico: '',
        contrasena: ''
    });

    // Cargar los datos actuales del usuario
    useEffect(() => {
        const fetchUser = async () => {
            const url = configuracion.urlJsonServerBackendUsers.toString().concat(`/${idUsuario}`);
            console.log(url);
            const result = await fetch(url);
            if (result.ok) {
                const data = await result.json();
                setUserData(data);
            }
        };
        fetchUser();
    }, [idUsuario]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleEdit = async (e: React.FormEvent) => {
        e.preventDefault();
        const url = configuracion.urlJsonServerBackendUsers.toString().concat(`/${idUsuario}`);
        console.log(url);
        await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(userData) 
        });
       /*  navigate('/admin'); */ // Redirigir a la página de administración
    };

    return (
        <div className="caja-crear-cuenta">
            <h3>Modifica los datos del usuario</h3>
            <form className="form-crear-cuenta" onSubmit={handleEdit}>
                <div className='form-crear-cuenta-row'>
                    <div className='crear-cuenta-column-1'>
                        <label htmlFor="nombres">Nombres</label>
                        <input
                            type="text"
                            id="nombres"
                            name="nombres"
                            value={userData.nombres}
                            onChange={handleChange}
                            placeholder="Ej: Roberto Andrés"
                        />

                        <label htmlFor="apellidoPaterno">Apellido Paterno</label>
                        <input
                            type="text"
                            id="apellidoPaterno"
                            name="apellidoPaterno"
                            value={userData.apellidoPaterno}
                            onChange={handleChange}
                            placeholder="Ej: Gonzáles"
                        />

                        <label htmlFor="apellidoMaterno">Apellido Materno</label>
                        <input
                            type="text"
                            id="apellidoMaterno"
                            name="apellidoMaterno"
                            value={userData.apellidoMaterno}
                            onChange={handleChange}
                            placeholder="Ej: Ramírez"
                        />

                        <label htmlFor="correoElectronico">Correo electrónico</label>
                        <input
                            type="email"
                            id="correoElectronico"
                            name="correoElectronico"
                            value={userData.correoElectronico}
                            onChange={handleChange}
                            placeholder="Ej: tuemail@gmail.com"
                        />

                        <label htmlFor="contrasena">Contraseña</label>
                        <input
                            type="password"
                            id="contrasena"
                            name="contrasena"
                            value={userData.contrasena}
                            onChange={handleChange}
                            placeholder="Crea una contraseña segura"
                        />
                    </div>
                </div>

                <button type="submit" className="boton-crear-cuenta">Guardar cambios</button>
            </form>
        </div>
    );
};

export default AdminUserModify;
