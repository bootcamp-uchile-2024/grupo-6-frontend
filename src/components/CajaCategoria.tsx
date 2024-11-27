import '../styles/categorias.css';
import { Link } from 'react-router-dom';
import ButtonAddToCart from './ButtonAddToCart';
import QuantityButtons from './shoppingcart/QuantityButtons';
import { ShoppingCartEntrada } from '../interfaces/ShoppingCartEntrada';

interface CajaCategoriaProps {
  isbn: string,
  nombre: string,
  autor: string[],
  precio: number,
  stock: number
}

export function CajaCategoria(props: CajaCategoriaProps) {

  const product: ShoppingCartEntrada = {
    nombre: props.nombre,
    autor: props.autor,
    precio: props.precio,
    isbn: props.isbn,
    cantidad: 0,
    correoElectronico: '',
  };

  const isOutOfStock = props.stock === 0;

  return (
    <div className={`container-catalog ${isOutOfStock ? 'out-of-stock' : ''}`}>
      <div className="foto-categoria">
        <Link to={`/product-detail/${props.isbn}`}> {/* Cambiar con back */}
          <img src={"https://placehold.co/216x300/c7c7c7/white?font=lato"}/* {props.libro.caratula} */ alt="imagen"/* {"imagen del libro " + props.libro.nombre} */ />
        </Link>
      </div>

      <div className="texto-categoria">
        <Link to={`/product-detail/${props.isbn}`}> {/* Cambiar con back */}
          <p className='texto-nombre-libro'>{props.nombre}</p>
        </Link>
        <p className='texto-autor'>{props.autor.join(', ')}</p>

        <p className='texto-precio'>${props.precio}</p>

        <div className='catalog-buttons-container'>
          <QuantityButtons isbn={props.isbn} />
          <ButtonAddToCart libro={product} />
        </div>
      </div>
    </div>
  );
};