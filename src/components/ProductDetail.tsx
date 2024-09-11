import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ILibro } from '../interfaces/ILibro';
import '../styles/product_detail.css'
import estrella_llena from '../assets/images/estrella_llena.png'
import estrella_vacia from '../assets/images/estrella_vacia.png'

const ProductDetail: React.FC = () => {
    const { isbn } = useParams<{ isbn: string }>();
    const [libro, setLibro] = useState<ILibro | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchProduct() {
            try {
                const response = await fetch(`/productdetail-back/${isbn}`, { //9789585581616
                    method: 'GET',
                    mode: 'no-cors'
                }); //${isbn}

                if (!response.ok) {
                    throw new Error('No pudimos obtener los detalles del libro');
                }
                const productData: ILibro = await response.json();
                setLibro(productData);
            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError('Ha ocurrido un error desconocido');
                }
            } finally {
                setLoading(false);
            }
        }

        fetchProduct();
    }, [isbn]);

    if (loading) return <div>Cargando...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className='container'>
            {libro ? ( // Si el libro existe
                <>
                    <div className='product-detail'>
                        <div className='img-libro'>
                            <img src='https://placehold.co/800@3x.png' alt={libro.nombre} />
                        </div>
                        <div className='info-libro'>
                            <h1>{libro.nombre}</h1>
                            <h3 className='autor'>{libro.autor.join(', ')}</h3>
                            <p className='resumen'>{libro.resumen}</p>
                            <div className='caja-estrellas'>
                                <img src={estrella_llena} alt="" />
                                <img src={estrella_llena} alt="" />
                                <img src={estrella_llena} alt="" />
                                <img src={estrella_vacia} alt="" />
                                <img src={estrella_vacia} alt="" />
                            </div>
                            <p className='precio'>Precio: ${libro.precio}</p>
                            <button className='add-to-cart'>Agregar al carro</button>
                        </div>
                    </div>

                    <div className='libro-descripcion'>
                        <h2>Ficha técnica</h2>
                        <table>
                            <tbody>
                                <tr>
                                    <td>ISBN:</td>
                                    <td>{libro.isbn}</td>
                                </tr>
                                <tr>
                                    <td>Editorial:</td>
                                    <td>{libro.editorial}</td>
                                </tr>
                                <tr>
                                    <td>Encuadernación:</td>
                                    <td>{libro.encuadernacion}</td>
                                </tr>
                                <tr>
                                    <td>Género(s):</td>
                                    <td>{libro.genero.join(', ')}</td>
                                </tr>
                                <tr>
                                    <td>Idioma:</td>
                                    <td>{libro.idioma}</td>
                                </tr>
                                <tr>
                                    <td>Año de publicación:</td>
                                    <td>{libro.agnoPublicacion}</td>
                                </tr>
                                <tr>
                                    <td>Número de páginas:</td>
                                    <td>{libro.numeroPaginas}</td>
                                </tr>
                                <tr>
                                    <td>Dimensiones:</td>
                                    <td>{libro.dimensiones}</td>
                                </tr>
                                <tr>
                                    <td>Código de barra:</td>
                                    <td>{libro.ean}</td>
                                </tr>
                                <tr>
                                    <td>Calificación:</td>
                                    <td>{libro.calificacion}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </>
            ) : (
                <div>No se encontró el producto</div>
            )}
        </div>
    );
};

export default ProductDetail;

/* return (
    <div className='container'>
        {libro ? ( //si el libro existe:
            <div className='product-detail'>
                <img src='https://placehold.co/600x400/000000/FFFFFF/png' alt={libro.nombre} />
                <div>
                    <h1>{libro.nombre}</h1>
                    <p>ISBN: {libro.isbn}</p>
                    <p>Autor: {libro.autor.join(', ')}</p>
                    <p>Stock: {libro.stockLibro}</p>
                    <p>Precio: ${libro.precio}</p>
                    <p>Género(s): {libro.genero.join(', ')}</p>
                    <p>Editorial: {libro.editorial}</p>
                    <p>Idioma: {libro.idioma}</p>
                    <p>Encuadernación: {libro.encuadernacion}</p>
                    <p>Año de publicación: {libro.agnoPublicacion}</p>
                    <p>Número de páginas: {libro.numeroPaginas}</p>
                    <p>Descuento: {libro.descuento}%</p>
                    <p>Dimensiones: {libro.dimensiones}</p>
                    <p>Código de barra: {libro.ean}</p>
                    <p>Resumen: {libro.resumen}</p>
                    <p>Calificación: {libro.calificacion}</p>
                </div>
            </div>
        ) : (
            <div>No se encontró el producto</div>
        )}
    </div>
);
}; */