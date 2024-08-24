import icono_imagen from './assets/images/icono_imagen.png'
import './styles/estilos_home.css'

function CajaProducto() {

  return (
    <>
            <div className="cajaProductosHome">
                <a href="">
                    <div className="fotoLibroHome">
                        <img src={icono_imagen} alt="imagen"/>
                    </div>
                </a>
                <div className="textoLibroHome">
                    <p>Título</p>
                    <p>Ut enim ad minim veniam, quis nostrud.</p>
                    <button type="button">Comprar</button>
                </div>
            </div>
    </>
  )
}

export default CajaProducto
