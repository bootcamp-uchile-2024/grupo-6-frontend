import { useState } from 'react';
import { Container, Carousel } from 'react-bootstrap';
import '../styles/home_info.css';
import CajaNovedades from './CajaNovedades';
import esoterismo from '../assets/images/esoterismo.png';
import autoAyuda from '../assets/images/autoayuda.png';
import ciencias from '../assets/images/ciencias.png';
import { useFetchGetDestacados, useFetchGetNovedades, useFetchGetTendencias } from '../hooks/useFetch';
import { ILibroPaginado } from '../interfaces/ILibroPaginado';
import { configuracion } from '../config/appConfiguration';

const HomeInfo = () => {

  const [error] = useState<string | null>(null);

  const [paginaActual] = useState<number>(1);

  const cantidad = 5; // Número de productos por página, se puede cambiar

  const { data: destacadosResponse, loading: loadingDestacados, error:  errorDestacados } = useFetchGetDestacados<ILibroPaginado>(configuracion.urlJsonServerBackendCatalog, paginaActual, cantidad,true);
  const { data: novedadesResponse, loading: loadingNovedades, error:  errorNovedades } = useFetchGetNovedades<ILibroPaginado>(configuracion.urlJsonServerBackendCatalog, paginaActual, cantidad,true);
  const { data: tendenciasResponse, loading: loadingTendencias, error:  errorTendencias } = useFetchGetTendencias<ILibroPaginado>(configuracion.urlJsonServerBackendCatalog, paginaActual, cantidad,true);

  if (loadingDestacados) return <p>Cargando datos...</p>
  if (errorDestacados) return <p>Error en la consulta de datos {error}</p>
  if (loadingNovedades) return <p>Cargando datos...</p>
  if (errorNovedades) return <p>Error en la consulta de datos {error}</p>
  if (loadingTendencias) return <p>Cargando datos...</p>
  if (errorTendencias) return <p>Error en la consulta de datos {error}</p>


  return (
    <main>
      {/* Slider */}
      <Container className="carousel-container">
        <Carousel className="custom-carousel" interval={5000} indicators controls>
          {/* Slice 1 */}
          <Carousel.Item>
            <div className="carousel-slide">
              <div className="text-section">
                <h2 className="main-title">¡Bienvenido a Páginas Selectas!</h2>
                <p className="sub-title">
                  El lugar ideal para encontrar <br />
                  tu próxima lectura
                </p>
              </div>
              <div
                className="image-section"
                style={{ backgroundImage: `url(${esoterismo})` }}
              ></div>
            </div>
          </Carousel.Item>

          {/* Slice 2 */}
          <Carousel.Item>
            <div className="carousel-slide">
              <div className="text-section">
                <h2 className="main-title">¿Buscas mejorar tus hábitos?</h2>
                <p className="sub-title">¡Haz click en esta sección!</p>
              </div>
              <div
                className="image-section"
                style={{ backgroundImage: `url(${autoAyuda})` }}
              ></div>
            </div>
          </Carousel.Item>

          {/* Slice 3 */}
          <Carousel.Item>
            <div className="carousel-slide">
              <div className="text-section">
                <h2 className="main-title">¡Encuentra la respuesta a todas tus preguntas!</h2>
                <p className="sub-title">Expándete, explora, conócete.</p>
              </div>
              <div
                className="image-section"
                style={{ backgroundImage: `url(${ciencias})` }}
              ></div>
            </div>
          </Carousel.Item>
        </Carousel>
      </Container>

      {error ? (
        <Container>
          <h3 className="text-danger">{error}</h3>
        </Container>
      ) : (
        <>
          {/* Sección de destacados */}
          <section className="products-section destacados-section">
            <Container className="container-cards">
              <div className="section-header">
                <h3>Productos destacados</h3>
              </div>
              <div className="row-custom">
                {destacadosResponse?.productos ? (
                  destacadosResponse.productos.map((libro) => (
                    <CajaNovedades
                      key={libro.isbn}
                      nombre={libro.nombre}
                      autor={libro.autor}
                      precio={libro.precio}
                      isbn={libro.isbn}
                      stock={libro.stockLibro}
                      caratula={libro.caratula}
                    />
                  ))
                ) : (
                  <h3>Ups, no encontramos libros destacados disponibles!!</h3>
                )}
              </div>
            </Container>
          </section>

          {/* Sección de novedades */}
          <section className="products-section novedades-section">
            <Container className="container-cards">
              <div className="section-header">
                <h3>Novedades</h3>
              </div>
              <div className="row-custom">
              {novedadesResponse?.productos ? (
                  novedadesResponse.productos.map((libro) => (
                    <CajaNovedades
                      key={libro.isbn}
                      nombre={libro.nombre}
                      autor={libro.autor}
                      precio={libro.precio}
                      isbn={libro.isbn}
                      stock={libro.stockLibro}
                      caratula={libro.caratula}
                    />
                  ))
                ) : (
                  <h3>Ups, no encontramos novedades disponibles!!</h3>
                )}
              </div>
            </Container>
          </section>

          {/* Sección de tendencias */}
          <section className="products-section tendencias-section">
            <Container className="container-cards">
              <div className="section-header">
                <h3>Tendencias</h3>
              </div>
              <div className="row-custom">
              {tendenciasResponse?.productos ? (
                  tendenciasResponse.productos.map((libro) => (
                    <CajaNovedades
                      key={libro.isbn}
                      nombre={libro.nombre}
                      autor={libro.autor}
                      precio={libro.precio}
                      isbn={libro.isbn}
                      stock={libro.stockLibro}
                      caratula={libro.caratula}
                    />
                  ))
                ) : (
                  <h3>Ups, no encontramos tendencias disponibles!!</h3>
                )}
              </div>
            </Container>
          </section>
        </>
      )}
    </main>
  );
};

export default HomeInfo;
