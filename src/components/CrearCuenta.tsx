import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ICreateUser } from '../interfaces/ICreateUser';
import '../styles/login.css'

const CrearCuenta = () => {

    const navigate = useNavigate();

    const [errorNombres, setErrorNombres] = useState<boolean>(false);
    const [errorApellidoPaterno, setErrorApellidoPaterno] = useState<boolean>(false);
    const [errorApellidoMaterno, setErrorApellidoMaterno] = useState<boolean>(false);
    const [errorCorreo, setErrorCorreo] = useState<boolean>(false);
    const [errorContrasena, setErrorContrasena] = useState<boolean>(false);
    const [errorCalle, setErrorCalle] = useState<boolean>(false);
    const [errorNumeroCalle, setErrorNumeroCalle] = useState<boolean>(false);
    const [errorComuna, setErrorComuna] = useState<boolean>(false);
    const [errorCiudad, setErrorCiudad] = useState<boolean>(false);
    const [errorRegion, setErrorRegion] = useState<boolean>(false);

    const [form, setForm] = useState<ICreateUser>({
        nombres: '',
        apellidoMaterno: '',
        apellidoPaterno: '',
        correoElectronico: '',
        contrasena: '',
        direccion: {
            calle: '',
            numeroCalle: '',
            comuna: '',
            ciudad: '',
            region: '',
            numeroDepartamento: '',
            informacionAdicional: '',
            tipoDireccion: 'Envio'
        },
        tipoCliente: 'Estandar',
        estado: 'Activo'
    });

    const validaForm = () => {
        let formValido = true;

        setErrorNombres(false);
        setErrorApellidoPaterno(false);
        setErrorApellidoMaterno(false);
        setErrorCorreo(false);
        setErrorContrasena(false);
        setErrorCalle(false);
        setErrorNumeroCalle(false);
        setErrorComuna(false);
        setErrorCiudad(false);
        setErrorRegion(false);

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
        if (form.direccion.calle === "") {
            setErrorCalle(true);
            formValido = false;
        }
        if (form.direccion.numeroCalle === "") {
            setErrorNumeroCalle(true);
            formValido = false;
        }
        if (form.direccion.comuna === "") {
            setErrorComuna(true);
            formValido = false;
        }
        if (form.direccion.ciudad === "") {
            setErrorCiudad(true);
            formValido = false;
        }
        if (form.direccion.region === "") {
            setErrorRegion(true);
            formValido = false;
        }

        return formValido;
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (validaForm()) {
            alert("Cuenta de usuario ha sido creada con éxito.")
            console.log('Usuario creado');
            console.log(form);
            setForm({
                nombres: '',
                apellidoMaterno: '',
                apellidoPaterno: '',
                correoElectronico: '',
                contrasena: '',
                direccion: {
                    calle: '',
                    numeroCalle: '',
                    comuna: '',
                    ciudad: '',
                    region: '',
                    numeroDepartamento: '',
                    informacionAdicional: '',
                    tipoDireccion: 'Envio'
                },
                tipoCliente: 'Estandar',
                estado: 'Activo'
            })
            navigate('/'); // Cambiar ruta
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target as HTMLInputElement;
        
        setErrorNombres(false);
        setErrorApellidoPaterno(false);
        setErrorApellidoMaterno(false);
        setErrorCorreo(false);
        setErrorContrasena(false);
        setErrorCalle(false);
        setErrorNumeroCalle(false);
        setErrorComuna(false);
        setErrorCiudad(false);
        setErrorRegion(false);
        
        if (name in form.direccion) {
            setForm({
                ...form,
                direccion: {
                    ...form.direccion,
                    [name]: value
                }
            });
        }
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
                        <input type="text" onChange={handleChange} id='nombres' name='nombres' placeholder="Ej: Roberto Andrés"/>
                        {errorNombres && <p className="error">Ingrese nombres.</p>}

                        <label htmlFor="apellidoPaterno">Apellido Paterno</label>
                        <input type="text" onChange={handleChange} id='apellidoPaterno' name='apellidoPaterno' placeholder="Ej: Gonzáles"/>
                        {errorApellidoPaterno && <p className="error">Ingrese apellido paterno.</p>}

                        <label htmlFor="apellidoMaterno">Apellido Materno</label>
                        <input type="text" onChange={handleChange} id='apellidoMaterno' name='apellidoMaterno' placeholder="Ej: Ramírez"/>
                        {errorApellidoMaterno && <p className="error">Ingrese apellido materno.</p>}

                        <label htmlFor="correoElectronico">Correo electrónico</label>
                        <input type="email" onChange={handleChange} id='correoElectronico' name='correoElectronico' placeholder="Ej: tuemail@gmail.com"/>
                        {errorCorreo && <p className="error">Ingrese correo electrónico válido.</p>}

                        <label htmlFor="contrasena">Contraseña</label>
                        <input type="password" onChange={handleChange} id='contrasena' name='contrasena' placeholder="Crea una contraseña segura"/>
                        {errorContrasena && <p className="error">Cree una contraseña.</p>}

                        <label htmlFor="calle">Calle</label>
                        <input type="text" onChange={handleChange} id='calle' name='calle' placeholder="Ej: Av. Salvador" />
                        {errorCalle && <p className="error">Ingrese calle.</p>}

                    </div>

                    <div className='crear-cuenta-column-2'>
                        <label htmlFor="numeroCalle">Número de calle</label>
                        <input type="text" onChange={handleChange} id='numeroCalle' name='numeroCalle' placeholder="Ej: 183"/>
                        {errorNumeroCalle && <p className="error">Ingrese número de calle.</p>}

                        <label htmlFor="numeroDepartamento">Número departamento</label>
                        <input type="text" onChange={handleChange} id='numeroDepartamento' name='numeroDepartamento' placeholder="Ej: 101" />

                        <label htmlFor="comuna">Comuna</label>
                        <input type="text" onChange={handleChange} id='comuna' name='comuna' placeholder="Ej: Santiago"/>
                        {errorComuna && <p className="error">Ingrese una comuna.</p>}

                        <label htmlFor="ciudad">Ciudad</label>
                        <input type="text" onChange={handleChange} id='ciudad' name='ciudad' placeholder="Ej: Santiago"/>
                        {errorCiudad && <p className="error">Ingrese una ciudad.</p>}

                        <label htmlFor="region">Región</label>
                        <select onChange={handleChange} id="region" name="region">
                            <option value="">Seleccione...</option>
                            <option value="Arica y Parinacota">Arica y Parinacota</option>
                            <option value="Tarapacá">Tarapacá</option>
                            <option value="Antofagasta">Antofagasta</option>
                            <option value="Atacama">Atacama</option>
                            <option value="Coquimbo">Coquimbo</option>
                            <option value="Valparaíso">Valparaíso</option>
                            <option value="Metropolitana">Metropolitana de Santiago</option>
                            <option value="O'Higgins">O'Higgins</option>
                            <option value="Maule">Maule</option>
                            <option value="BioBío">BioBío</option>
                            <option value="Ñuble">Ñuble</option>
                            <option value="Araucanía">La Araucanía</option>
                            <option value="Los Ríos">Los Ríos</option>
                            <option value="Los Lagos">Los Lagos</option>
                            <option value="Aysén">Aysén</option>
                            <option value="Magallanes">Magallanes y Antártica Chilena</option>
                        </select>
                        {errorRegion && <p className="error">Seleccione una región.</p>}

                        <label htmlFor="informacionAdicional">Información adicional</label>
                        <input type="text" onChange={handleChange} id='informacionAdicional' name='informacionAdicional' placeholder="Agregue información adicional" />
                    </div>
                </div>

                <button type="submit" className='boton-crear-cuenta'>Crear Cuenta</button>

            </form>
        </div>
    )
}

export default CrearCuenta