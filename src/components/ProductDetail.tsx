import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ILibro } from '../interfaces/ILibro';
import '../styles/product_detail.css'
import estrellaLlena from '../assets/images/estrella_llena.png'
import estrellaVacia from '../assets/images/estrella_vacia.png'
import ButtonAddToCart from './ButtonAddToCart';
import { ShoppingCartEntrada } from '../interfaces/ShoppingCartEntrada';
import QuantityButtons from './shoppingcart/QuantityButtons';

const ProductDetail: React.FC = () => {
    const { isbn } = useParams<{ isbn: string }>();
    const [libro, setLibro] = useState<ILibro | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    
    const [producto, setProducto] = useState<ShoppingCartEntrada>({
        nombre: '',
        autor: [""],
        precio: 0,
        isbn: "",
        cantidad: 1,
        correoElectronico: "",
    });

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`/productdetail-back/${isbn}`, { method: 'GET' });

                if (!response.ok) {
                    throw new Error('No pudimos obtener los detalles del libro');
                }

                const productData: ILibro = await response.json();
                setLibro(productData);

                setProducto({
                    nombre: productData?.nombre || '',
                    autor: productData?.autor || [""],
                    precio: productData?.precio || 0,
                    isbn: productData?.isbn || "",
                    cantidad: 1,
                    correoElectronico: ""
                });

            } catch (error) {
                setError(error instanceof Error ? error.message : 'Ha ocurrido un error desconocido');
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [isbn]);
    
    if (loading) return <div>Cargando...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className='container-detail'>
            {libro ? (
                <>
                    <div className='product-detail'>
                        <div className='img-libro-detail'>
                            <img src='https://placehold.co/800@3x.png' alt={libro.nombre} />
                        </div>
                        <div className='info-libro-detail'>
                            <h1>{libro.nombre}</h1>
                            <h3 className='autor-detail'>{libro.autor.join(', ')}</h3>
                            <p className='resumen-detail'>{libro.resumen}</p>
                            <div className='caja-estrellas-detail'>
                                <img src={estrellaLlena} alt="Estrella llena" />
                                <img src={estrellaLlena} alt="Estrella llena" />
                                <img src={estrellaLlena} alt="Estrella llena" />
                                <img src={estrellaVacia} alt="Estrella vacía" />
                                <img src={estrellaVacia} alt="Estrella vacía" />
                            </div>
                            <p className='precio-detail'>Precio: ${libro.precio}</p>
                            
                            <ButtonAddToCart libro={producto}></ButtonAddToCart>
                            {isbn && <QuantityButtons isbn={isbn} />}
                        </div>
                    </div>

                    <div className='libro-descripcion-detail'>
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