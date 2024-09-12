import '../styles/estilos_home.css'
import estrella_llena from '../assets/images/estrella_llena.png'
import estrella_vacia from '../assets/images/estrella_vacia.png'
import { Link } from 'react-router-dom';


interface CajaNovedadesProps {
    isbn: string,
    nombre: string,
    autor: string[],
    precio: number,
  }
  
function CajaNovedades(props: CajaNovedadesProps) {

    return (
        <>
            <Link to={`/product-detail/${props.isbn}`}> {/* Cambiar con back */}
                <div className="cajaProductosHome">
                    <a href="">
                        <div className="fotoLibroHome">
                        <img src={"https://placehold.co/400x400/c7c7c7/white?text=Imagen\nLibro&font=lato"}/* {props.libro.caratula} */ alt="imagen"/* {"imagen del libro " + props.libro.nombre} */ />
                </div>
                </a>
                <div className="textoLibroHome">
                    <p>{props.nombre}</p>
                    <p>{props.autor}</p>
                    <div className='caja-estrellas'>
                        <img src={estrella_llena} alt="" />
                        <img src={estrella_llena} alt="" />
                        <img src={estrella_llena} alt="" />
                        <img src={estrella_vacia} alt="" />
                        <img src={estrella_vacia} alt="" />
                    </div>
                    <div className='caja-precio-boton'>
                        <p>${props.precio}</p>
                        <button type="button">Comprar</button>
                    </div>
                    </div>
                </div>

            </Link>
        </>
    )
}

export default CajaNovedades