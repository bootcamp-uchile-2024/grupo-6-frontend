import { Link } from 'react-router-dom';
import { configuracion } from '../config/appConfiguration';
import { ShoppingCartEntrada } from '../interfaces/ShoppingCartEntrada';
import '../styles/search.css'
import { useState } from 'react';
import CatalogButtonAddToCart from './shoppingcart/CatalogButtonAddToCart';
import CatalogQuantityButtons from './shoppingcart/CatalogQuantityButton';

interface SearchCardProps {
    isbn: string,
    nombre: string,
    autor: string,
    precio: number,
    stock: number,
    caratula: File
}

const SearchCard = (props: SearchCardProps) => {

    const [quantity, setQuantity] = useState(1);

    const product: ShoppingCartEntrada = {
        nombre: props.nombre,
        autor: props.autor,
        precio: props.precio,
        isbn: props.isbn,
        cantidad: quantity,
        correoElectronico: '',
        caratula: props.caratula,

    };

    const isOutOfStock = props.stock === 0;

    const url = configuracion.urlJsonServerBackendCover.toString();

    const handleQuantityChange = (_isbn: string, newQuantity: number) => {
        setQuantity(newQuantity);
    };

    return (
        <div className={`search-card ${isOutOfStock ? 'out-of-stock' : ''}`}>
            <div className='foto-search-card'>
                <Link to={`/product-detail/${props.isbn}`}>
                    <img src={`${url}${props.caratula}`} alt={`imagen del libro ${props.nombre}`} />
                </Link>
            </div>

            <div className='texto-search'>
                <Link to={`/product-detail/${props.isbn}`}>
                    <p className='texto-nombre-libro'>{props.nombre}</p>
                </Link>
                <p className='texto-autor'>{props.autor}</p>

                <p className='texto-precio-search'>${props.precio.toLocaleString()}</p>

                <div className='search-buttons-container'>
                    <CatalogQuantityButtons
                        isbn={props.isbn}
                        disabled={isOutOfStock}
                        onQuantityChange={handleQuantityChange}
                    />
                    <CatalogButtonAddToCart
                        libro={product}
                        showIcon={true}
                        disabled={isOutOfStock} />
                </div>
            </div>
        </div >
    );
}

export default SearchCard;