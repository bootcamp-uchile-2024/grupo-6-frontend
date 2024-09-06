import icono_imagen from '../assets/images/icono_imagen.png'
import estrella2 from '../assets/images/estrella2.png'
import '../styles/estilos_home.css'
import { CrearProductoEntrada } from '../interfaces/CrearProductoEntrada'

/* interface CajaProductoProps {
  libro: CrearProductoEntrada
} */

function CajaProducto(/* props: CajaProductoProps */) {

  return (
    <>
      <div className="cajaProductosHome">
          <a href="">
            <div className="fotoLibroHome">
              <img src={"https://placehold.co/400x400/c7c7c7/white?text=Imagen\nLibro&font=lato"}/* {props.libro.caratula} */ alt="imagen"/* {"imagen del libro " + props.libro.nombre} *//>
            </div>
          </a>
          <div className="textoLibroHome">
            <p>Título del libro {/* {props.libro.nombre} */}</p>
            <p>Autor del libro {/* {props.libro.autor} */}</p>
          <div className='caja-estrellas'>
            {/* {estrellas según reseñas} */}
            <img src={estrella2} alt="casilifación según estrellas" />
            <img src={estrella2} alt="casilifación según estrellas" />
            <img src={estrella2} alt="casilifación según estrellas" />
            <img src={estrella2} alt="casilifación según estrellas" />
            <img src={estrella2} alt="casilifación según estrellas" />
          </div>
          <div className='caja-precio-boton'>
            <p>$25.990 {/* ${props.libro.precio} */}</p>
            <button type="button">Comprar</button>
          </div>
          </div>
      </div>
    </>
  )
}

export default CajaProducto