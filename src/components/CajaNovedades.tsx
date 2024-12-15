import '../styles/home_info.css'
import { Link } from 'react-router-dom';
import ButtonAddToCart from './shoppingcart/ButtonAddToCart';
import QuantityButtons from './shoppingcart/QuantityButtons';
import { ShoppingCartEntrada } from '../interfaces/ShoppingCartEntrada'
import Card from 'react-bootstrap/esm/Card';

interface CajaNovedadesProps {
    isbn: string,
    nombre: string,
    autor: string[],
    precio: number,
    stock: number,
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
    
    const isOutOfStock = props.stock === 0;

    return (
        <div key={product.isbn} className="col-custom">
            <div className="product-card">
                <Link to={`/product-detail/${props.isbn}`}> {/* Cambiar con back */}
                    <Card.Img
                        variant="top"
                        src={props.caratula}
                        alt={props.nombre}
                        className="card-image"
                    />
                </Link>
                <Card.Body className="container-info-card">
                    <Link to={`/product-detail/${props.isbn}`}> {/* Cambiar con back */}

                        <Card.Title className="card-title">{product.nombre}</Card.Title>
                    </Link>
                    <Card.Text className="autor-card">{product.autor.join(', ')}</Card.Text>
                    <p className="precio-card">${product.precio.toLocaleString()}</p>
                    <div className="product-actions">
                        <div className='home-buttons-container'>
                            <QuantityButtons isbn={props.isbn} disabled={isOutOfStock}/>
                            <ButtonAddToCart libro={product} showIcon={true}/>
                        </div>
                    </div>
                </Card.Body>

            </div>
        </div>
    );
};

export default CajaNovedades;