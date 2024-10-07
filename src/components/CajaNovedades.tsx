import '../styles/novedades_home.css'
import estrellaLlena from '../assets/images/estrella_llena.png'
import estrellaVacia from '../assets/images/estrella_vacia.png'
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
                <div className="caja-novedades">
                        <div className="foto-novedad">
                            <img src={"https://placehold.co/400x400/c7c7c7/white?text=Imagen\nLibro&font=lato"}/* {props.libro.caratula} */ alt="imagen"/* {"imagen del libro " + props.libro.nombre} */ />
                        </div>
                    <div className="texto-novedad">
                        <p>{props.nombre}</p>
                        <p>{props.autor.join(', ')}</p>
                        <div className='caja-novedad-estrellas'>
                            <img src={estrellaLlena} alt="estrella llena" />
                            <img src={estrellaLlena} alt="estrella llena" />
                            <img src={estrellaLlena} alt="estrella llena" />
                            <img src={estrellaVacia} alt="estrella vacía" />
                            <img src={estrellaVacia} alt="estrella vacía" />
                        </div>
                        <div className='caja-novedad-precio-boton'>
                            <p>${props.precio}</p>
                            <button type="button">Comprar</button>
                        </div>
                    </div>
                </div>

            </Link>
        </>
    );
};

export default CajaNovedades;