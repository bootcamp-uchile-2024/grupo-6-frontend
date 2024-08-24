import icono_imagen from './assets/images/icono_imagen.png'
import './styles/estilos_home.css'

function CajaMain() {

  return (
    <>
        <main>
            <div className="cajaMain">
                <h2 id="tituloMain">Quienes somos</h2>
                <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum."</p>
            </div>
            <div className="cajaMain cajaMain2">
                <img src={icono_imagen} alt="imagen"/>
            </div>
        </main>
    </>
  )
}

export default CajaMain
