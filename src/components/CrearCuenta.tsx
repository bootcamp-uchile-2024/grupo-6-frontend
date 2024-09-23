import '../styles/login.css'
const CrearCuenta = () => {
    return (
        <div className="caja-crear-cuenta">
            <p>¡Se parte de nuestra familia de lectores!</p>
            <h3>Crea una cuenta</h3>
            <form className="form-crear-cuenta">
                <div className='form-crear-cuenta-row'>
                    <div className='crear-cuenta-column-1'>
                        <label htmlFor="nombres">Nombres</label>
                        <input type="text" id='nombres' placeholder="Ej: Roberto Andrés" required/>

                        <label htmlFor="apellido-paterno">Apellido Paterno</label>
                        <input type="text" id='apellido-paterno' placeholder="Ej: Gonzáles" required/>

                        <label htmlFor="apellido-materno">Apellido Materno</label>
                        <input type="text" id='apellido-materno' placeholder="Ej: Ramírez" required/> 

                        <label htmlFor="correo">Correo electrónico</label>
                        <input type="email" id='correo' placeholder="Ej: tuemail@gmail.com" required/>

                        <label htmlFor="constrasena">Contraseña</label>
                        <input type="password" id='constrasena' placeholder="Crea una contraseña segura" required/> 

                        <label htmlFor="calle">Calle</label>
                        <input type="text" id='calle' placeholder="Ej: Av. Salvador" required/>                
                    </div>

                    <div className='crear-cuenta-column-2'>
                        <label htmlFor="numero-calle">Número de calle</label>
                        <input type="text" id='numero-calle' placeholder="Ej: 183" required/>

                        <label htmlFor="numero-depto">Número departamento</label>
                        <input type="text" id='numero-depto' placeholder="Ej: 101"/>

                        <label htmlFor="comuna">Comuna</label>
                        <input type="text" id='comuna' placeholder="Ej: Santiago" required/>

                        <label htmlFor="ciudad">Ciudad</label>
                        <input type="text" id='ciudad' placeholder="Ej: Santiago" required/>

                        <label htmlFor="region">Región</label>
                        <input type="text" id='region' placeholder="Ej: Región Metropolitana" required/>

                        <label htmlFor="info-adicional">Información adicional</label>
                        <input type="text" id='info-adicional' placeholder="Agregue información adicional"/>
                    </div>
                </div>

                <button type="submit" className='boton-crear-cuenta'>Crear Cuenta</button>
                
            </form>
        </div>
    )
}

export default CrearCuenta