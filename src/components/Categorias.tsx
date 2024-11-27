import '../styles/categorias.css'
import { CajaCategoria } from './CajaCategoria.tsx'
import Filtros from './Filtros.tsx'
import { ILibro } from '../interfaces/ILibro.ts'
import { useState, useEffect } from 'react'
import { ILibroPaginado } from '../interfaces/ILibroPaginado.tsx'
import { configuracion } from '../config/appConfiguration.ts'
import { Col, Container, Row } from 'react-bootstrap'
import libreria from '../assets/images/libreria.svg'

export function Categorias() {

  const [libros, setLibros] = useState<ILibro[]>([]);
  const [librosExist, setLibrosExist] = useState<boolean>(false);
  const [paginaActual, setPaginaActual] = useState<number>(1);
  const [totalPaginas, setTotalPaginas] = useState<number>(1);
  const [cantidad, setCantidad] = useState<number>(6); // Definir el valor inicial, por ejemplo 6

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
        setLibros(librosJson?.productos);
        setLibrosExist(true);
        setTotalPaginas(librosJson.totalPaginas);
      } catch (error) {
        console.error('Error al obtener los productos', error); // Usando 'error'
        setLibrosExist(false);
      }
    }

    getLibros();
  }, [paginaActual, cantidad]);

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
    let fin = Math.min(totalPaginas, inicio + maxVisible - 1); // Calcula el final del rango

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
        <Col lg={12}>
          <div className='catalog-title-container'>
            <h3 className="titulo-categorias">Nuestros productos</h3>
            <a href="#">
              <button>
                <img src={libreria} alt="" />
                Ver todas las categorías
              </button>
            </a>
          </div>
        </Col>

        <Col lg={2}>
          <Filtros />
        </Col>
        <Col lg={10}>

            <div id="productos-categorias">
              {librosExist ? libros.map(libro => (
                <CajaCategoria key={libro.isbn} nombre={libro.nombre} autor={libro.autor} precio={libro.precio} isbn={libro.isbn}  ></CajaCategoria>
              ))
                :
                <h3>Ups, no encontramos libros disponibles!!</h3>
              }
            </div>

          {/* Paginación */}
          <div className="catalog-pagination">

            <button className='boton-paginacion' onClick={handleFirstPage} disabled={paginaActual === 1}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-double-left" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M8.354 1.646a.5.5 0 0 1 0 .708L2.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0" />
                <path fill-rule="evenodd" d="M12.354 1.646a.5.5 0 0 1 0 .708L6.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0" />
              </svg>
            </button>

            <button className='boton-paginacion' onClick={handlePaginaAnterior} disabled={paginaActual === 1}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-left" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0" />
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
                <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708" />
              </svg>
            </button>

            <button className='boton-paginacion' onClick={handleLastPage} disabled={paginaActual === totalPaginas}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-double-right" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708" />
                <path fill-rule="evenodd" d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708" />
              </svg>
            </button>
          </div>

          <div className="catalog-pagination">
            <label htmlFor="cantidad" className='text-pagination'>Estás visualizando </label>
            <select
              className='select-pagination'
              id="cantidad"
              value={cantidad}
              onChange={(e) => setCantidad(Number(e.target.value))}>
              <option value={4}>4</option>
              <option value={8}>8</option>
              <option value={16}>16</option>
              <option value={24}>24</option>
              <option value={32}>32</option>
            </select>
            <p className='text-pagination'>productos</p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};