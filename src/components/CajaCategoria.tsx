import '../styles/categorias.css';
import { Link } from 'react-router-dom';
import ButtonAddToCart from './shoppingcart/ButtonAddToCart';
import QuantityButtons from './shoppingcart/QuantityButtons';
import { ShoppingCartEntrada } from '../interfaces/ShoppingCartEntrada';
import { configuracion } from '../config/appConfiguration.ts'

interface CajaCategoriaProps {
  isbn: string,
  nombre: string,
  autor: string,
  precio: number,
  stock: number,
  caratula: File
}

export function CajaCategoria(props: CajaCategoriaProps) {

  const product: ShoppingCartEntrada = {
    nombre: props.nombre,
    autor: props.autor,
    precio: props.precio,
    isbn: props.isbn,
    cantidad: 0,
    correoElectronico: '',
    caratula: props.caratula,

  };

  const isOutOfStock = props.stock === 0;

  const url = configuracion.urlJsonServerBackendCover.toString();

  return (
    <div className={`container-catalog ${isOutOfStock ? 'out-of-stock' : ''}`}>
      <div className="foto-categoria">
        <Link to={`/product-detail/${props.isbn}`}>

          <img src={`${url}${props.caratula}`} alt={`imagen del libro ${props.nombre}`} />
        
        </Link>
      </div>

      <div className="texto-categoria">
        <Link to={`/product-detail/${props.isbn}`}>
          <p className='texto-nombre-libro'>{props.nombre}</p>
        </Link>
        <p className='texto-autor'>{props.autor}</p>

        <p className='texto-precio'>${props.precio.toLocaleString()}</p>

        <div className='catalog-buttons-container'>
          <QuantityButtons isbn={props.isbn} disabled={isOutOfStock}/>
          <ButtonAddToCart libro={product} showIcon={true}/>
        </div>
      </div>
    </div>
  );
};