import '../styles/categorias.css'
import { CajaCategoria } from './CajaCategoria.tsx'
import Filtros from './Filtros.tsx'
import { ILibro } from '../interfaces/ILibro.ts'
import { useState, useEffect } from 'react'
import { ILibroPaginado } from '../interfaces/ILibroPaginado.tsx'
import { configuracion } from '../config/appConfiguration.ts'

export function Categorias() {

  const [libros, setLibros] = useState<ILibro[]>([]);
  const [librosExist, setLibrosExist] = useState<boolean>(false);
  const [paginaActual, setPaginaActual] = useState<number>(1);
  const [totalPaginas, setTotalPaginas] = useState<number>(1);
  const cantidad = 6; // Número de productos por página, se puede cambiar


  useEffect(() => {
    async function getLibros() {
      try {
        const url = configuracion.urlJsonServerBackendCatalog.toString().concat(`?pagina=${paginaActual}&cantidad=${cantidad}`);
        const response = await fetch(url, {
          method: 'GET',
        });

        if (!response.ok) {
          console.log('No pudimos obtener los productos');
          setLibrosExist(false);
          return; // Salir si no hay respuesta OK
        }

        const librosJson: ILibroPaginado = await response.json();
        console.log(librosJson);
        console.log("nroPagina: " + librosJson.nroPagina + ", totalPaginas: " + librosJson.totalPaginas + ", totalProductos: " + librosJson.totalProductos);
        setLibros(librosJson?.productos);
        setLibrosExist(true);
        setTotalPaginas(librosJson.totalPaginas);
      } catch (error) {
        console.error('Error al obtener los productos', error); // Usando 'error'
        setLibrosExist(false);
      }
    }

    getLibros();
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
      <Filtros />
      <hr />
      <section id="seccion-categorias">
        <h3 className="titulo-categorias">Categorías</h3>

        <div id="productos-categorias">
          {librosExist ? libros.map(libro => (
            <CajaCategoria key={libro.isbn} nombre={libro.nombre} autor={libro.autor} precio={libro.precio} isbn={libro.isbn}  ></CajaCategoria>
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