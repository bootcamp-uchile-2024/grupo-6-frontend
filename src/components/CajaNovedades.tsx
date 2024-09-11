import '../styles/estilos_home.css'
import estrella_llena from '../assets/images/estrella_llena.png'
import estrella_vacia from '../assets/images/estrella_vacia.png'
import { Link } from 'react-router-dom';

function CajaNovedades() {

    return (
        <>
            <Link to={`/product-detail/9789585581616`}> {/* Cambiar con back */}
                <div className="cajaProductosHome">
                    <a href="">
                        <div className="fotoLibroHome">
                            <img src={"https://placehold.co/400x400/c7c7c7/white?text=Imagen\nLibro&font=lato"}/* {props.libro.caratula} */ alt="imagen"/* {"imagen del libro " + props.libro.nombre} */ />
                        </div>
                    </a>
                    <div className="textoLibroHome">
                        <p>Título del libro</p>
                        <p>Autor del libro</p>
                        <div className='caja-estrellas'>
                            <img src={estrella_llena} alt="" />
                            <img src={estrella_llena} alt="" />
                            <img src={estrella_llena} alt="" />
                            <img src={estrella_vacia} alt="" />
                            <img src={estrella_vacia} alt="" />
                        </div>
                        <div className='caja-precio-boton'>
                            <p>$25.990</p>
                            <button type="button">Comprar</button>
                        </div>
                    </div>
                </div>
            </Link>
        </>
    )
}

export default CajaNovedades