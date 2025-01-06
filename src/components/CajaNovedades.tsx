import '../styles/categorias.css';
import { Link } from 'react-router-dom';
import { ShoppingCartEntrada } from '../interfaces/ShoppingCartEntrada'
import { configuracion } from '../config/appConfiguration.ts'
import CatalogButtonAddToCart from './shoppingcart/CatalogButtonAddToCart.tsx';
import CatalogQuantityButtons from './shoppingcart/CatalogQuantityButton.tsx';
import { useState } from 'react';

interface CajaNovedadesProps {
    isbn: string,
    nombre: string,
    autor: string,
    precio: number,
    stock: number,
    caratula: File,
}

function CajaNovedades(props: CajaNovedadesProps) {

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
                    <CatalogQuantityButtons
                        isbn={props.isbn}
                        disabled={isOutOfStock}
                        onQuantityChange={handleQuantityChange}
                    />
                    <CatalogButtonAddToCart
                        libro={product}
                        showIcon={true}
                        disabled={isOutOfStock}
                    />
                </div>
            </div>
        </div>
    );
};

export default CajaNovedades;