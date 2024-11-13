import { useEffect, useState } from 'react';
import { ILibro } from '../interfaces/ILibro.ts';
import '../styles/novedades_home.css';
import CajaNovedades from './CajaNovedades.tsx';
import { ILibroPaginado } from '../interfaces/ILibroPaginado.tsx';

function NovedadesHome() {

    const [libros, setLibros] = useState<ILibro[]>([]);
    const [librosExist, setLibrosExist] = useState<boolean>(false);
    const [paginaActual, setPaginaActual] = useState<number>(1);
    const [totalPaginas, setTotalPaginas] = useState<number>(1);
    const cantidad = 6; // Número de productos por página, se puede cambiar

    useEffect(() => {
        const fetchLibros = async () => {
            try {
                const response = await fetch(`/products-back?pagina=${paginaActual}&cantidad=${cantidad}`, {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    console.error('No pudimos obtener los productos');
                    setLibrosExist(false);
                    return;
                }

                const librosJson: ILibroPaginado = await response.json();
                console.log(librosJson);
                console.log("nroPagina: " + librosJson.nroPagina + ", totalPaginas: " + librosJson.totalPaginas + ", totalProductos: " + librosJson.totalProductos);
                setLibros(librosJson?.productos);
                setLibrosExist(true);
                setTotalPaginas(librosJson.totalPaginas);
            } catch (error) {
                console.error('Error al obtener los productos', error);
                setLibrosExist(false);
            }
        };

        fetchLibros();
    }, [paginaActual]);

    /* Paginación */
    const handlePaginaAnterior = () => {
        if (paginaActual > 1) setPaginaActual(paginaActual - 1);
    };

    const handlePaginaSiguiente = () => {
        if (paginaActual < totalPaginas) setPaginaActual(paginaActual + 1);
    };

    return (
        <main className='contenido-central'>
            <section id="seccion-novedades">
                <h3 className="titulo-novedades">Novedades</h3>
                <div id="productos-novedades">
                    {librosExist ? libros.map(libro => (
                        <CajaNovedades key={libro.isbn} nombre={libro.nombre} autor={libro.autor} precio={libro.precio} isbn={libro.isbn}></CajaNovedades>
                    ))
                        :
                        <h3>Ups, no encontramos libros disponibles!!</h3>
                    }
                </div>

                {/* Controles de paginación */}
                <div className="categorias-paginacion">
                    <button className='boton-paginacion' onClick={handlePaginaAnterior} disabled={paginaActual === 1}>&#8592;</button>
                    <span>Página {paginaActual} de {totalPaginas}</span>
                    <button className='boton-paginacion' onClick={handlePaginaSiguiente} disabled={paginaActual === totalPaginas}>&#8594;</button>
                </div>

            </section>
        </main>
    );
};

export default NovedadesHome;