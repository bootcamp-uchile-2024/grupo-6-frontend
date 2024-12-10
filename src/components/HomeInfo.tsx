import { useState, useEffect } from 'react';
import { Container, Carousel } from 'react-bootstrap';
import '../styles/home_info.css';
import CajaNovedades from './CajaNovedades';
import esoterismo from '../assets/images/esoterismo.png';
import autoAyuda from '../assets/images/autoayuda.png';
import ciencias from '../assets/images/ciencias.png';

interface IProductCards {
  isbn: string;
  nombre: string;
  autor: string[];
  precio: number;
  stockLibro: number;
  caratula: string;
}

const HomeInfo = () => {
  const [products, setProducts] = useState<{
    destacados: IProductCards[];
    novedades: IProductCards[];
    tendencias: IProductCards[];
  }>({
    destacados: [],
    novedades: [],
    tendencias: [],
  });

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Fetch destacados, novedades y tendencias desde el servidor JSON
        const destacadosResponse = await fetch('http://localhost:4000/destacados');
        const novedadesResponse = await fetch('http://localhost:4000/novedades');
        const tendenciasResponse = await fetch('http://localhost:4000/tendencias');

        if (!destacadosResponse.ok || !novedadesResponse.ok || !tendenciasResponse.ok) {
          throw new Error('Error al cargar los datos del servidor');
        }

        const destacados = await destacadosResponse.json();
        const novedades = await novedadesResponse.json();
        const tendencias = await tendenciasResponse.json();

        setProducts({ destacados, novedades, tendencias });
      } catch (error) {
        console.error('Error al cargar los productos:', error);
        setError('Error al cargar los productos. Intente nuevamente más tarde.');
      }
    };

    fetchProducts();
  }, []);

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
                {products.destacados.length > 0 ? (
                  products.destacados.map((libro) => (
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
                {products.novedades.length > 0 ? (
                  products.novedades.map((libro) => (
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
                {products.tendencias.length > 0 ? (
                  products.tendencias.map((libro) => (
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
