import iconoCarritoVacio from '../../assets/images/icono_carrito_vacio.png'
import { Link } from 'react-router-dom';
import '../../styles/empty_cart.css'

export const EmptyCart = () => {
    return (
        <div className="caja-empty-cart">
            <h2 className='titulo-empty-cart'>Tu carro está vacío</h2>
            <div className="info-empty-cart">
                <img src={iconoCarritoVacio} alt="Carrito vacío" />
                <p>No has añadido ningún libro todavía.
                    <br />
                    ¡Explora nuestra colección y encuentra tu próxima lectura!
                </p>
                <Link to={`/categorias`}>
                    <p className='emptycart-to-product'>Seguir comprando</p>
                </Link>
            </div>
        </div>
    );
};