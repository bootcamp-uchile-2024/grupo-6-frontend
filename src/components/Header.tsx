import '../styles/header.css'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { RootType } from '../states/store';
import { selectCartItemCount } from '../states/productSlice';
import { Container, Row, Col, Form, Button, Dropdown } from 'react-bootstrap';
import logoPaginasSelectas from '../assets/images/logo-ux.png'
import { useEffect, useRef, useState } from 'react';
import { configuracion } from '../config/appConfiguration';
import { ILibro } from '../interfaces/ILibro';


function Header() {

  const navigate = useNavigate();

  // ESTADO PARA LA BÚSQUEDA
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ILibro[]>([]);

  // Para obtener la cantidad de productos del carrito
  const itemCount = useSelector(selectCartItemCount);

  const handleCartClick = () => {
    if (itemCount > 0) {
      navigate('/carrito'); // Si el carrito tiene productos, redirige al detalle de la página de carrito 
    } else {
      navigate('/empty-cart') // Si el carrito está vacío, redirige a esa página 'carrito vacío'
    }
  }

  const isAuthenticated = useSelector((state: RootType) => state.authReducer.isAuthenticated);
  const user = useSelector((state: RootType) => state.authReducer.user);

  const handleUserIconClick = () => {
    if (!isAuthenticated) {
      navigate('/login');
    } else if (user?.rol === 'ADMIN') {
      navigate('/admin');
    } else if (user?.rol === 'USER') {
      navigate('/user');
    }
  };

  const cartIcon = itemCount > 0 ? (
    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="27" viewBox="0 0 26 27" fill="none">
      <path fillRule="evenodd" clipRule="evenodd" d="M21.2367 15.3182C24.0425 14.0754 26 11.2663 26 8C26 3.58172 22.4183 0 18 0C14.471 0 11.4756 2.28505 10.4129 5.4563H4.9718L4.75187 3.83478C4.68691 3.35579 4.29744 3 3.83807 3H0.92308C0.413277 3 0 3.43531 0 3.97228C0 4.50926 0.413277 4.94456 0.92308 4.94456H3.03749L3.25473 6.54629C3.25634 6.56037 3.25824 6.57435 3.26042 6.58824L4.75384 17.5994C4.75546 17.6136 4.75738 17.6277 4.75958 17.6418L5.25626 21.3038C5.32123 21.7828 5.71069 22.1386 6.17006 22.1386H6.53517C6.09668 22.6546 5.83005 23.3361 5.83005 24.0832C5.83005 25.6941 7.06989 27 8.59929 27C10.1287 27 11.3685 25.6941 11.3685 24.0832C11.3685 23.3361 11.1019 22.6546 10.6634 22.1386H15.7656C15.3271 22.6546 15.0605 23.3361 15.0605 24.0832C15.0605 25.6941 16.3003 27 17.8297 27C19.3592 27 20.599 25.6941 20.599 24.0832C20.599 23.0188 20.0578 22.0876 19.2494 21.5783C19.305 21.4532 19.3361 21.3136 19.3361 21.1663C19.3361 20.6293 18.9228 20.194 18.413 20.194H6.97065L6.73467 18.4542H19.5789C19.9762 18.4542 20.329 18.1864 20.4546 17.7893L21.2367 15.3182Z" fill="currentColor" />
    </svg>
  ) : (
    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="26" viewBox="0 0 25 26" fill="none">
      <path fillRule="evenodd" clipRule="evenodd" d="M0.923085 0.571411C0.413279 0.571411 0 1.0309 0 1.59771C0 2.16452 0.413279 2.62401 0.923085 2.62401H3.0375L3.25474 4.31471C3.25636 4.32957 3.25825 4.34434 3.26043 4.359L4.75386 15.9819C4.75549 15.9969 4.7574 16.0118 4.75961 16.0266L5.25629 19.8921C5.32125 20.3977 5.71072 20.7733 6.17009 20.7733H6.52868C6.09407 21.2884 5.83008 21.9668 5.83008 22.7101C5.83008 24.3211 7.06992 25.627 8.59933 25.627C10.1288 25.627 11.3686 24.3211 11.3686 22.7101C11.3686 21.9668 11.1046 21.2884 10.67 20.7733H15.7591Z" fill="currentColor" />
    </svg>
  );

  // HANDLES PARA BÚSQUEDA
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSearch = async () => {
    if (query.trim() === "") return;

    try {
      const response = await fetch(`${configuracion.urlJsonServerBackendDetailsSearch}?query=${query}`, {
        method: 'GET',
        headers: { 'accept': 'application/json' }
      });

      if (response.ok) {
        const data = await response.json();
        setResults(data.productos);
      } else {
        console.error("Error en la búsqueda");
      }
    } catch (error) {
      console.error("Error al realizar la petición:", error);
    }
  };

  const searchResultsRef = useRef<HTMLDivElement>(null);

  // Detectar clics fuera del contenedor de resultados
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchResultsRef.current && !searchResultsRef.current.contains(event.target as HTMLElement)) {
        setResults([]); // Ocultar resultados si el usuario hace clic fuera
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (

    <header id="header">

      <div className="container-header">

        <Container fluid className="header-top">
          <Row className="container-herramientas">
            <Col className="d-flex align-items-center">
              <div className="input-group">
                <Form.Control
                  type="text"
                  placeholder="Busca tus libros aquí"
                  className="header-search-input"
                  value={query}
                  onChange={handleSearchChange} />
                <button
                  className="input-group-text bg-white border-0"
                  onClick={handleSearch}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none" className="icon-search-button">
                    <path fillRule="evenodd" clipRule="evenodd" d="M10.2 3.02695C5.89217 3.02695 2.4 6.51913 2.4 10.827C2.4 15.1347 5.89218 18.627 10.2 18.627C14.5078 18.627 18 15.1347 18 10.827C18 6.51913 14.5078 3.02695 10.2 3.02695ZM0 10.827C0 5.19364 4.56669 0.626953 10.2 0.626953C15.8333 0.626953 20.4 5.19364 20.4 10.827C20.4 13.2154 19.5791 15.412 18.204 17.1502L23.6473 22.5772C24.1166 23.0451 24.1177 23.8049 23.6498 24.2742C23.1819 24.7435 22.4221 24.7447 21.9527 24.2768L16.505 18.8454C14.7697 20.2118 12.5801 21.027 10.2 21.027C4.56669 21.027 0 16.4602 0 10.827Z" fill="currentColor" />
                  </svg>
                </button>

                {/* RESULTADOS BÚSQUEDA */}
                {results.length > 0 && (
                  <div ref={searchResultsRef}  className="search-results">
                    <ul>
                      {results.map((product) => (
                        <div key={product.isbn}>
                          <Link to={`/product-detail/${product.isbn}`}>
                            <li>
                              <p>{product.nombre}, {product.autor}, {product.editorial}</p>
                            </li>
                          </Link>
                        </div>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </Col>

            <Col md={3} className="buttons-headers-top d-flex gap-3">
              <Button variant="none" className="header-icon" onClick={handleUserIconClick}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none" className="icon-user-button">
                  <path fillRule="evenodd" clipRule="evenodd" d="M0 12.627C0 5.99954 5.37259 0.626953 12 0.626953C18.6275 0.626953 24 5.99954 24 12.627C24 19.2544 18.6275 24.627 12 24.627C5.37259 24.627 0 19.2544 0 12.627ZM12 2.47311C6.39219 2.47311 1.84615 7.01914 1.84615 12.627C1.84615 15.0074 2.6653 17.1965 4.03709 18.9278C4.23562 18.3563 4.51608 17.8042 4.86848 17.3146C5.62448 16.264 6.79695 15.3962 8.30769 15.3962H15.6923C17.2031 15.3962 18.3755 16.264 19.1315 17.3146C19.4839 17.8043 19.7644 18.3563 19.9629 18.9279C21.3347 17.1966 22.1538 15.0074 22.1538 12.627C22.1538 7.01914 17.6079 2.47311 12 2.47311ZM18.4378 20.4794C18.3578 19.778 18.0775 19.0106 17.6331 18.3929C17.1054 17.6598 16.4318 17.2423 15.6923 17.2423H8.30769C7.56824 17.2423 6.89456 17.6598 6.36695 18.3929C5.92246 19.0106 5.64219 19.778 5.56217 20.4794C7.31429 21.9176 9.55634 22.7808 12 22.7808C14.4437 22.7808 16.6857 21.9176 18.4378 20.4794ZM7.38462 8.93465C7.38462 6.38565 9.45093 4.31926 12 4.31926C14.5491 4.31926 16.6154 6.38565 16.6154 8.93465C16.6154 11.4837 14.5491 13.55 12 13.55C9.45094 13.55 7.38462 11.4837 7.38462 8.93465ZM12 6.16541C10.4705 6.16541 9.23077 7.40524 9.23077 8.93465C9.23077 10.4641 10.4705 11.7039 12 11.7039C13.5295 11.7039 14.7692 10.4641 14.7692 8.93465C14.7692 7.40524 13.5295 6.16541 12 6.16541Z" fill="currentColor" />
                </svg>
              </Button>
              <Button variant="none" className="header-icon" onClick={handleCartClick} >
                <div className="cart-icon-container-header">
                  {cartIcon}
                  {itemCount > 0 && (
                    <span className="badge">{itemCount}</span>
                  )}
                </div>
              </Button>
            </Col>
          </Row>
        </Container>

        <Container fluid className="header-nav">
          <Row className="container-nav">
            <Col className="col-nav">
              <nav className="menu-header">
                <Link to="/" className="menu-link">Home</Link>
                <Link to="/about" className="menu-link">Nosotros</Link>
                <Link to={`/novedades`} className="menu-link">Novedades</Link>
                <Link to="/mystery-box" className="menu-link">Mystery Box</Link>
                <Link to="/supcripciones" className="menu-link">Suscripciones</Link>

                <Dropdown>
                  <Dropdown.Toggle as="div" className="menu-catalog-button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none" className="icon-catalog-button">
                      <path fillRule="evenodd" clipRule="evenodd" d="M2.5 4.92695C2.5 2.27599 4.64904 0.126953 7.3 0.126953H18.1C20.0883 0.126953 21.7 1.73874 21.7 3.72695V22.927C21.7 23.5897 21.1627 24.127 20.5 24.127H6.1C4.11179 24.127 2.5 22.5152 2.5 20.527V4.92695ZM4.9 17.1318V4.92695C4.9 3.60147 5.97452 2.52695 7.3 2.52695H18.1C18.7628 2.52695 19.3 3.0642 19.3 3.72695V16.927H6.1C5.67924 16.927 5.27534 16.9991 4.9 17.1318ZM19.3 19.327H6.1C5.43725 19.327 4.9 19.8642 4.9 20.527C4.9 21.1897 5.43725 21.727 6.1 21.727H19.3V19.327ZM8.5 7.32695C8.5 6.66421 9.03726 6.12695 9.7 6.12695H14.5C15.1627 6.12695 15.7 6.66421 15.7 7.32695C15.7 7.98969 15.1627 8.52695 14.5 8.52695H9.7C9.03726 8.52695 8.5 7.98969 8.5 7.32695Z" fill="currentColor" />
                    </svg>
                    Catálogo
                  </Dropdown.Toggle>

                  <Dropdown.Menu className="dropdown-menu-catalog" flip={false}>
                    <div className="menu-container">
                      <div className="menu-column">
                        <Dropdown.Item href="/categoria/novelas" className="dropdown-item-categoria">Novelas</Dropdown.Item>
                        <Dropdown.Item href="/categoria/deportes" className="dropdown-item-categoria">Deportes</Dropdown.Item>
                        <Dropdown.Item href="/categoria/clasicos" className="dropdown-item-categoria">Clásicos</Dropdown.Item>
                        <Dropdown.Item href="/categoria/diseno" className="dropdown-item-categoria">Diseño</Dropdown.Item>
                        <Dropdown.Item href="/categoria/infantil" className="dropdown-item-categoria">Infantil</Dropdown.Item>
                        <Dropdown.Item href="/categoria/poesia" className="dropdown-item-categoria">Poesía</Dropdown.Item>
                      </div>
                      <div className="menu-column">
                        <Dropdown.Item href="/categoria/literatura" className="dropdown-item-categoria">Literatura</Dropdown.Item>
                        <Dropdown.Item href="/categoria/biografias" className="dropdown-item-categoria">Biografías</Dropdown.Item>
                        <Dropdown.Item href="/categoria/arquitectura" className="dropdown-item-categoria">Arquitectura</Dropdown.Item>
                        <Dropdown.Item href="/categoria/arte" className="dropdown-item-categoria">Arte</Dropdown.Item>
                        <Dropdown.Item href="/categoria/juvenil" className="dropdown-item-categoria">Juvenil</Dropdown.Item>
                        <Dropdown.Item href="/categoria/romance" className="dropdown-item-categoria">Romance</Dropdown.Item>
                      </div>
                      <div className="menu-column">
                        <Dropdown.Item href="/categoria/ficcion" className="dropdown-item-categoria">Ficción</Dropdown.Item>
                        <Dropdown.Item href="/categoria/misterio" className="dropdown-item-categoria">Misterio</Dropdown.Item>
                        <Dropdown.Item href="/categoria/autoayuda" className="dropdown-item-categoria">Autoayuda</Dropdown.Item>
                        <Dropdown.Item href="/categoria/historia" className="dropdown-item-categoria">Historia</Dropdown.Item>
                        <Dropdown.Item href="/categoria/fotografia" className="dropdown-item-categoria">Fotografía</Dropdown.Item>
                        <Dropdown.Item href={`/categorias`} className="dropdown-item-categoria">Revisar todas las categorías</Dropdown.Item>
                      </div>
                      <div className="menu-column">
                        <Dropdown.Item href="/categoria/terror" className="dropdown-item-categoria">Terror</Dropdown.Item>
                        <Dropdown.Item href="/categoria/ilustracion" className="dropdown-item-categoria">Ilustración</Dropdown.Item>
                        <Dropdown.Item href="/categoria/gestion" className="dropdown-item-categoria">Gestión</Dropdown.Item>
                        <Dropdown.Item href="/categoria/estilo-de-vida" className="dropdown-item-categoria">Estilo de vida</Dropdown.Item>
                        <Dropdown.Item href="/categoria/ciencias" className="dropdown-item-categoria">Ciencias</Dropdown.Item>
                      </div>
                    </div>
                  </Dropdown.Menu>
                </Dropdown>

              </nav>
            </Col>
          </Row>
        </Container>

        <Link to="/">
          <img src={logoPaginasSelectas} alt="Páginas selectas" className="header-logo" />
        </Link>

      </div>
    </header>
  );
};

export default Header;
