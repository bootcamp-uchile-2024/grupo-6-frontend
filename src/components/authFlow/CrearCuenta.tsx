import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ICreateUser } from '../../interfaces/ICreateUser';
import '../../styles/login.css'

const CrearCuenta = () => {
    const navigate = useNavigate();

    const [errorNombres, setErrorNombres] = useState<boolean>(false);
    const [errorApellidoPaterno, setErrorApellidoPaterno] = useState<boolean>(false);
    const [errorApellidoMaterno, setErrorApellidoMaterno] = useState<boolean>(false);
    const [errorCorreo, setErrorCorreo] = useState<boolean>(false);
    const [errorContrasena, setErrorContrasena] = useState<boolean>(false);

    const [form, setForm] = useState<ICreateUser>({
        nombres: '',
        apellidoMaterno: '',
        apellidoPaterno: '',
        correoElectronico: '',
        contrasena: ''
    });

    const validaForm = () => {
        let formValido = true;

        setErrorNombres(false);
        setErrorApellidoPaterno(false);
        setErrorApellidoMaterno(false);
        setErrorCorreo(false);
        setErrorContrasena(false);

        if (form.nombres === "") {
            setErrorNombres(true);
            formValido = false;
        }
        if (form.apellidoPaterno === "") {
            setErrorApellidoPaterno(true);
            formValido = false;
        }
        if (form.apellidoMaterno === "") {
            setErrorApellidoMaterno(true);
            formValido = false;
        }
        if (form.correoElectronico === "" || !form.correoElectronico.includes("@")) {
            setErrorCorreo(true);
            formValido = false;
        }
        if (form.contrasena === "") {
            setErrorContrasena(true);
            formValido = false;
        }

        return formValido;
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (validaForm()) {
            try {
                const response = await fetch('/create-user-back', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(form),
                });

                if (response.ok) {
                    const data = await response.json();
                    alert("Cuenta de usuario ha sido creada con éxito.");
                    console.log('Usuario creado:', data);
                    setForm({
                        nombres: '',
                        apellidoMaterno: '',
                        apellidoPaterno: '',
                        correoElectronico: '',
                        contrasena: '',
                    });
                    navigate('/');
                } else {
                    const errorData = await response.json();
                    alert(errorData.error); // Esto muestra el error del backend
                }
            } catch (error) {
                console.error('Error al crear el usuario:', error);
                alert('Hubo un error al crear la cuenta. Por favor, intenta de nuevo.');
            }
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target as HTMLInputElement;

        setErrorNombres(false);
        setErrorApellidoPaterno(false);
        setErrorApellidoMaterno(false);
        setErrorCorreo(false);
        setErrorContrasena(false);

        if (name in form) {
            setForm({
                ...form,
                [name]: value
            });
        }
    };

    return (
        <div className="caja-crear-cuenta">
            <p>¡Se parte de nuestra familia de lectores!</p>
            <h3>Crea una cuenta</h3>
            <form onSubmit={handleSubmit} className="form-crear-cuenta">
                <div className='form-crear-cuenta-row'>
                    <div className='crear-cuenta-column-1'>
                        <label htmlFor="nombres">Nombres</label>
                        <input type="text" onChange={handleChange} id='nombres' name='nombres' placeholder="Ej: Roberto Andrés" />
                        {errorNombres && <p className="error">Ingrese nombres.</p>}

                        <label htmlFor="apellidoPaterno">Apellido Paterno</label>
                        <input type="text" onChange={handleChange} id='apellidoPaterno' name='apellidoPaterno' placeholder="Ej: Gonzáles" />
                        {errorApellidoPaterno && <p className="error">Ingrese apellido paterno.</p>}

                        <label htmlFor="apellidoMaterno">Apellido Materno</label>
                        <input type="text" onChange={handleChange} id='apellidoMaterno' name='apellidoMaterno' placeholder="Ej: Ramírez" />
                        {errorApellidoMaterno && <p className="error">Ingrese apellido materno.</p>}

                        <label htmlFor="correoElectronico">Correo electrónico</label>
                        <input type="email" onChange={handleChange} id='correoElectronico' name='correoElectronico' placeholder="Ej: tuemail@gmail.com" />
                        {errorCorreo && <p className="error">Ingrese correo electrónico válido.</p>}

                        <label htmlFor="contrasena">Contraseña</label>
                        <input type="password" onChange={handleChange} id='contrasena' name='contrasena' placeholder="Crea una contraseña segura" />
                        {errorContrasena && <p className="error">Cree una contraseña.</p>}

                    </div>
                </div>

                <button type="submit" className='boton-crear-cuenta'>Crear Cuenta</button>

            </form>
        </div>
    );
};

export default CrearCuenta;