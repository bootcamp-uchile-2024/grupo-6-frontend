import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { configuracion } from "../config/appConfiguration";
import { ILibro } from "../interfaces/ILibro";
import SearchCard from "./SearchCards";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Search = () => {

    const location = useLocation();
    const { query } = location.state || {};
    const [results, setResults] = useState<ILibro[]>([]);
    const [paginaActual, setPaginaActual] = useState<number>(1);
    const [totalPaginas, setTotalPaginas] = useState<number>(1);
    const [cantidad, setCantidad] = useState<number>(12);

    useEffect(() => {
        if (query) {
            const fetchResults = async () => {
                try {
                    const url = configuracion.urlJsonServerBackendDetailsSearch.toString().concat(
                        `?pagina=${paginaActual}&cantidad=${cantidad}&query=${query}`);

                    const response = await fetch(url);
                    if (response.ok) {
                        const data = await response.json();
                        setResults(data.productos);
                        setTotalPaginas(data.totalPaginas);
                    } else {
                        console.error('Error en la búsqueda');
                    }
                } catch (error) {
                    console.error('Error al realizar la petición', error);
                }
            };

            fetchResults();
        } else {
            console.log('No hay query para buscar');
        }
    }, [query, paginaActual, cantidad]);

    /* Handles Paginación */
    const handlePaginaAnterior = () => {
        if (paginaActual > 1) setPaginaActual(paginaActual - 1);
    };

    const handlePaginaSiguiente = () => {
        if (paginaActual < totalPaginas) setPaginaActual(paginaActual + 1);
    };

    const handleFirstPage = () => {
        setPaginaActual(1);
    }

    const handleLastPage = () => {
        setPaginaActual(totalPaginas);
    }

    const handleSeleccionPagina = (pagina: number) => {
        setPaginaActual(pagina);
    };

    /* Cantidad de botones a mostrar */
    const generarRangoPaginas = (): number[] => {
        const rango: number[] = [];
        const maxVisible = 4; // Número máximo de páginas visibles en el rango
        let inicio = Math.max(1, paginaActual - 1); // Comienza con 1 o una página antes de la actual
        const fin = Math.min(totalPaginas, inicio + maxVisible - 1); // Calcula el final del rango

        if (fin - inicio + 1 < maxVisible) {
            inicio = Math.max(1, fin - maxVisible + 1);
        }

        for (let i = inicio; i <= fin; i++) {
            rango.push(i);
        }
        return rango;
    };

    return (
        <Container>
            <Row>
                <Col>
                    <p className="search-text-results">Resultados encontrados para: "{query}"</p>
                </Col>
            </Row>

            <Row>
                <Col>
                    <div className="search-results-container">
                        {results.length > 0 ? (
                            results.map((libro) => (
                                <SearchCard
                                    key={libro.isbn}
                                    nombre={libro.nombre}
                                    autor={libro.autor}
                                    precio={libro.precio}
                                    isbn={libro.isbn}
                                    stock={libro.stockLibro}
                                    caratula={libro.caratula} />
                            ))
                        ) : (
                            <p style={{marginBottom: '272px'}}>No se encontraron resultados.</p>
                        )}

                    </div>
                </Col>
            </Row>

            {/* Paginación */}
            {results.length > 0 && (
                <div className="catalog-pagination">

                    <button className='boton-paginacion' onClick={handleFirstPage} disabled={paginaActual === 1}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-double-left" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M8.354 1.646a.5.5 0 0 1 0 .708L2.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0" />
                            <path fillRule="evenodd" d="M12.354 1.646a.5.5 0 0 1 0 .708L6.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0" />
                        </svg>
                    </button>

                    <button className='boton-paginacion' onClick={handlePaginaAnterior} disabled={paginaActual === 1}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-left" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0" />
                        </svg>
                    </button>

                    {generarRangoPaginas().map(pagina => (
                        <button
                            key={pagina}
                            className={`boton-paginacion ${pagina === paginaActual ? 'activo' : ''}`}
                            onClick={() => handleSeleccionPagina(pagina)}
                        >
                            {pagina}
                        </button>
                    ))}

                    <button className='boton-paginacion' onClick={handlePaginaSiguiente} disabled={paginaActual === totalPaginas}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-right" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708" />
                        </svg>
                    </button>

                    <button className='boton-paginacion' onClick={handleLastPage} disabled={paginaActual === totalPaginas}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-double-right" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708" />
                            <path fillRule="evenodd" d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708" />
                        </svg>
                    </button>
                </div>
            )}

            {results.length > 0 && (
                <div className="catalog-pagination">
                    <label htmlFor="cantidad" className='text-pagination'>Estás visualizando </label>
                    <select
                        className='select-pagination'
                        id="cantidad"
                        value={cantidad}
                        onChange={(e) => setCantidad(Number(e.target.value))}> {/* Number(e.target.value) convierte el string a un número */}
                        <option value={12}>12</option>
                        <option value={24}>24</option>
                        <option value={36}>36</option>
                        <option value={48}>48</option>
                    </select>
                    <p className='text-pagination'>productos</p>
                </div>
            )}
        </Container>
    );
}

export default Search;