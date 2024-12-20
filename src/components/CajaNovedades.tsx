import '../styles/novedades_home.css'
import estrellaLlena from '../assets/images/estrella_llena.png'
import estrellaVacia from '../assets/images/estrella_vacia.png'
import { Link } from 'react-router-dom';
import ButtonAddToCart from './ButtonAddToCart'
import QuantityButtons from './shoppingcart/QuantityButtons';
import { ShoppingCartEntrada } from '../interfaces/ShoppingCartEntrada'

interface CajaNovedadesProps {
    isbn: string,
    nombre: string,
    autor: string[],
    precio: number,
    caratula: string,
}

function CajaNovedades(props: CajaNovedadesProps) {

    const product: ShoppingCartEntrada = {
        nombre: props.nombre,
        autor: props.autor,
        precio: props.precio,
        isbn: props.isbn,
        cantidad: 0,
        correoElectronico: '',
        caratula: props.caratula,
    };

    return (
        <div className="caja-novedades">
            <div className="foto-novedad">
                <Link to={`/product-detail/${props.isbn}`}> {/* Cambiar con back */}
                    <img src={"https://placehold.co/480x400/c7c7c7/white?text=Imagen\nLibro&font=lato"}/* {props.libro.caratula} */ alt="imagen"/* {"imagen del libro " + props.libro.nombre} */ />
                </Link>
            </div>
            <div className="texto-novedad">
                <Link to={`/product-detail/${props.isbn}`}> {/* Cambiar con back */}
                    <p className='texto-nombre-libro'>{props.nombre}</p>
                </Link>
                <p className='texto-autor'>{props.autor.join(', ')}</p>
                <div className='caja-novedad-estrellas'>
                    <img src={estrellaLlena} alt="estrella llena" />
                    <img src={estrellaLlena} alt="estrella llena" />
                    <img src={estrellaLlena} alt="estrella llena" />
                    <img src={estrellaVacia} alt="estrella vacía" />
                    <img src={estrellaVacia} alt="estrella vacía" />
                </div>

                <div className='caja-novedad-comprar'>
                    <div className='caja-novedad-precio'>
                        <p className='texto-precio'>${props.precio}</p>
                    </div>
                    <div className="caja-novedad-botones-carrito">
                        <ButtonAddToCart libro={product} />
                        <QuantityButtons isbn={props.isbn} />
                    </div>
                </div>
            </div>
        </div>


    );
};

export default CajaNovedades;