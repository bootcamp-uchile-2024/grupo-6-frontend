
import '../../styles/shopping_cart.css'
import { Link } from "react-router-dom";
import { useFetchGet } from "../../hooks/useFetch";
import { ILibro } from "../../interfaces/ILibro";
import ButtonProductModify from './ButtonProductModify';

function AdminBookList() {
    
    const { data: bookList, loading, error } = useFetchGet<ILibro[]>('/products-back');

    if (loading) return <p>Cargando datos...</p>
    if (error) return <p>Error en la consulta de datos {error}</p>

    return (
        <div className='shoppingcart'>
            <div className="shoppingcart-item-top-footer">
                <h2>Libros Disponibles</h2>
                <div className="shoppingcart-button-options">
                    <Link to={`/create/product`}>
                        <p className='shoppingcart-to-product'>Crear nuevo libro</p>
                    </Link>
                </div>
            </div>
            {bookList.length ? (
                <div className='shoppingcart-items'>
                    <table className="shoppingcart-items-table">
                        <thead>
                            <tr className="shoppingcart-item-detail-tr">
                                <th className="shoppingcart-item-detail-th" colSpan={2} scope="col">
                                    Libro
                                </th>
                                <th className="shoppingcart-item-detail-th" colSpan={1} scope="col">
                                    Editar
                                </th>
                                <th className="shoppingcart-item-detail-th" colSpan={1} scope="col">
                                    Eliminar
                                </th>
                            </tr>
                        </thead>
                        {bookList.map((item) => (

                            <>

                                <tbody className='shoppingcart-item-detail'>
                                    <tr className="shoppingcart-item-detail-tr">
                                        <td className="shoppingcart-item-detail-td-image">
                                            <img src='https://placehold.co/800@3x.png' alt={item.nombre} />
                                        </td>
                                        <td className="shoppingcart-item-detail-td-data">
                                            <div className="shoppingcart-item-detail-td-nombre">
                                                <label htmlFor="nombre-libro">Nombre: </label>
                                                <p>{item.nombre}</p>
                                                <p className='shoppingcart-item-detail'>{item.autor}</p>
                                            </div>
                                            <div className="shoppingcart-item-detail-td-autor">
                                                <label htmlFor="autor-libro">Autor: </label>
                                                <p className='shoppingcart-item-detail'>{item.autor}</p>
                                            </div>
                                        </td>
                                        <td className="shoppingcart-item-detail-td-quantity">
                                            <div className="shoppingcart-item-detail-td-quantity-1">
                                                    <ButtonProductModify libro={item}/>      
                                            </div>
                                        </td>

                                        <td className="shoppingcart-item-detail-td-total">
                                            <p> Eliminar item </p>
                                        </td>
                                    </tr>
                                </tbody>

                            </>
                        ))}
                    </table>
                </div>
            ) : (
                <div>No existen libros en el backend.</div>
            )}

            <div className="shoppingcart-item-top-footer">
                <h2>Total Libros: {bookList.length }</h2>
            </div>

        </div>
    );
};

export default AdminBookList;
