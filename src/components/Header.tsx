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

  // Estado para manejar la visibilidad del dropdown
  const [showDropdown, setShowDropdown] = useState(false);

  // ESTADO PARA LOS GÉNEROS
  const [generos, setGeneros] = useState<string[]>([]);

  // Para obtener los géneros al cargar componente
  useEffect(() => {
    fetch(configuracion.urlJsonServerBackendGenres)
      .then((response) => response.json())
      .then((data) => setGeneros(data))
      .catch((error) => console.error('Error al cargar géneros:', error));
  }, []);

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

  // Handle para manejar los clicks en los items del dropdown
  const handleCategoryClick = (genero: string) => {
    navigate('/categorias', { state: { generosSeleccionados: [genero] } });
    setShowDropdown(false); // Para ocultar el dropdown después del click
  };

  //Para mostrar el dropdown al pasar el mouse
  const handleMouseEnter = () => {
    setShowDropdown(true);
  }

  // Para ocultar el dropdown cuando el mouse sale del menú
  const handleMouseLeave = () => {
    setShowDropdown(false);
  }

  const cartIcon = itemCount > 0 ? (
    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="27" viewBox="0 0 26 27" fill="none">
      <path fillRule="evenodd" clipRule="evenodd" d="M21.2367 15.3182C24.0425 14.0754 26 11.2663 26 8C26 3.58172 22.4183 0 18 0C14.471 0 11.4756 2.28505 10.4129 5.4563H4.9718L4.75187 3.83478C4.68691 3.35579 4.29744 3 3.83807 3H0.92308C0.413277 3 0 3.43531 0 3.97228C0 4.50926 0.413277 4.94456 0.92308 4.94456H3.03749L3.25473 6.54629C3.25634 6.56037 3.25824 6.57435 3.26042 6.58824L4.75384 17.5994C4.75546 17.6136 4.75738 17.6277 4.75958 17.6418L5.25626 21.3038C5.32123 21.7828 5.71069 22.1386 6.17006 22.1386H6.53517C6.09668 22.6546 5.83005 23.3361 5.83005 24.0832C5.83005 25.6941 7.06989 27 8.59929 27C10.1287 27 11.3685 25.6941 11.3685 24.0832C11.3685 23.3361 11.1019 22.6546 10.6634 22.1386H15.7656C15.3271 22.6546 15.0605 23.3361 15.0605 24.0832C15.0605 25.6941 16.3003 27 17.8297 27C19.3592 27 20.599 25.6941 20.599 24.0832C20.599 23.0188 20.0578 22.0876 19.2494 21.5783C19.305 21.4532 19.3361 21.3136 19.3361 21.1663C19.3361 20.6293 18.9228 20.194 18.413 20.194H6.97065L6.73467 18.4542H19.5789C19.9762 18.4542 20.329 18.1864 20.4546 17.7893L21.2367 15.3182ZM10.0221 7.40086C10.0075 7.59866 10 7.79846 10 8C10 12.4183 13.5817 16 18 16C18.3727 16 18.7394 15.9745 19.0986 15.9252L18.9136 16.5096H6.47093L5.23553 7.40086H10.0221ZM7.40066 24.0832C7.40066 23.3859 7.9373 22.8206 8.59929 22.8206C9.2613 22.8206 9.79792 23.3859 9.79792 24.0832C9.79792 24.7805 9.2613 25.3457 8.59929 25.3457C7.9373 25.3457 7.40066 24.7804 7.40066 24.0832ZM17.8297 22.8206C17.1677 22.8206 16.6311 23.3859 16.6311 24.0832C16.6311 24.7805 17.1677 25.3457 17.8297 25.3457C18.4917 25.3457 19.0283 24.7805 19.0283 24.0832C19.0283 23.3859 18.4917 22.8206 17.8297 22.8206Z" fill="currentColor" />
    </svg>
  ) : (
    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
      <path fillRule="evenodd" clipRule="evenodd" d="M0.92308 0C0.413277 0 0 0.435305 0 0.972282C0 1.50926 0.413277 1.94456 0.92308 1.94456H3.03749L3.25473 3.54629C3.25634 3.56037 3.25824 3.57435 3.26042 3.58824L4.75384 14.5994C4.75546 14.6136 4.75738 14.6277 4.75958 14.6418L5.25626 18.3038C5.32123 18.7828 5.71069 19.1386 6.17006 19.1386H6.53517C6.09668 19.6546 5.83005 20.3361 5.83005 21.0832C5.83005 22.6941 7.06989 24 8.59929 24C10.1287 24 11.3685 22.6941 11.3685 21.0832C11.3685 20.3361 11.1019 19.6546 10.6634 19.1386H15.7656C15.3271 19.6546 15.0605 20.3361 15.0605 21.0832C15.0605 22.6941 16.3003 24 17.8297 24C19.3592 24 20.599 22.6941 20.599 21.0832C20.599 20.0188 20.0578 19.0876 19.2494 18.5783C19.305 18.4532 19.3361 18.3136 19.3361 18.1663C19.3361 17.6293 18.9228 17.194 18.413 17.194H6.97065L6.73467 15.4542H19.5789C19.9762 15.4542 20.329 15.1864 20.4546 14.7893L23.9526 3.73604C24.0465 3.43954 23.9993 3.11362 23.8258 2.86007C23.6523 2.60653 23.3736 2.4563 23.0769 2.4563H4.9718L4.75187 0.83478C4.68691 0.355787 4.29744 0 3.83807 0H0.92308ZM5.23553 4.40086L6.47093 13.5096H18.9136L21.7962 4.40086H5.23553ZM8.59929 19.8206C7.9373 19.8206 7.40066 20.3859 7.40066 21.0832C7.40066 21.7804 7.9373 22.3457 8.59929 22.3457C9.2613 22.3457 9.79792 21.7805 9.79792 21.0832C9.79792 20.3859 9.2613 19.8206 8.59929 19.8206ZM16.6311 21.0832C16.6311 20.3859 17.1677 19.8206 17.8297 19.8206C18.4917 19.8206 19.0283 20.3859 19.0283 21.0832C19.0283 21.7805 18.4917 22.3457 17.8297 22.3457C17.1677 22.3457 16.6311 21.7805 16.6311 21.0832Z" fill="currentColor" />
    </svg>
  );

  // HANDLES PARA BÚSQUEDA
  const handleSearchChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchQuery = event.target.value
    setQuery(searchQuery);

    if (searchQuery.trim() === '') {
      setResults([]); // Limpiar resultados si no hay texto en la búsqueda
      return;
    }

    try {
      const response = await fetch(`${configuracion.urlJsonServerBackendDetailsSearch}?query=${searchQuery}`, {
        method: 'GET',
        headers: { 'accept': 'application/json' }
      });

      if (response.ok) {
        const data = await response.json();
        setResults(data.productos);
      } else {
        console.error('Error en la búsqueda');
      }
    } catch (error) {
      console.error('Error al realiar la petición', error);
    }
  };

  const handleSearchClick = async () => {
    if (query.trim() === "") return;
    navigate('/search-results', { state: { query: query } });
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearchClick();
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

  const chunkArray = (arr: string[], size: number) => {
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size));
    }
    return result;
  };

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
                  onChange={handleSearchChange}
                  onKeyDown={handleKeyDown} />
                <button
                  className="input-group-text bg-white border-0"
                  onClick={handleSearchClick}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none" className="icon-search-button">
                    <path fillRule="evenodd" clipRule="evenodd" d="M10.2 3.02695C5.89217 3.02695 2.4 6.51913 2.4 10.827C2.4 15.1347 5.89218 18.627 10.2 18.627C14.5078 18.627 18 15.1347 18 10.827C18 6.51913 14.5078 3.02695 10.2 3.02695ZM0 10.827C0 5.19364 4.56669 0.626953 10.2 0.626953C15.8333 0.626953 20.4 5.19364 20.4 10.827C20.4 13.2154 19.5791 15.412 18.204 17.1502L23.6473 22.5772C24.1166 23.0451 24.1177 23.8049 23.6498 24.2742C23.1819 24.7435 22.4221 24.7447 21.9527 24.2768L16.505 18.8454C14.7697 20.2118 12.5801 21.027 10.2 21.027C4.56669 21.027 0 16.4602 0 10.827Z" fill="currentColor" />
                  </svg>
                </button>

                {/* RESULTADOS BÚSQUEDA */}
                {results.length > 0 && (
                  <div ref={searchResultsRef} className="search-results">
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

                <Dropdown
                  show={showDropdown}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  className="dropdown-menu-catalog"
                >
                  <Dropdown.Toggle variant="secondary" id="dropdown-catalog-toggle" className='menu-catalog-button'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M2.5 4.92695C2.5 2.27599 4.64904 0.126953 7.3 0.126953H18.1C20.0883 0.126953 21.7 1.73874 21.7 3.72695V22.927C21.7 23.5897 21.1627 24.127 20.5 24.127H6.1C4.11179 24.127 2.5 22.5152 2.5 20.527V4.92695ZM4.9 17.1318V4.92695C4.9 3.60147 5.97452 2.52695 7.3 2.52695H18.1C18.7628 2.52695 19.3 3.0642 19.3 3.72695V16.927H6.1C5.67924 16.927 5.27534 16.9991 4.9 17.1318ZM19.3 19.327H6.1C5.43725 19.327 4.9 19.8642 4.9 20.527C4.9 21.1897 5.43725 21.727 6.1 21.727H19.3V19.327ZM8.5 7.32695C8.5 6.66421 9.03726 6.12695 9.7 6.12695H14.5C15.1627 6.12695 15.7 6.66421 15.7 7.32695C15.7 7.98969 15.1627 8.52695 14.5 8.52695H9.7C9.03726 8.52695 8.5 7.98969 8.5 7.32695Z" fill="#F5FAFF" />
                    </svg>
                    Categorías
                  </Dropdown.Toggle>

                  {/* Menú desplegable */}
                  <Dropdown.Menu className="dropdown-menu-categorias">
                    {/* Géneros organizados en columnas */}
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      {chunkArray(generos, 6).map((chunk, index) => (
                        <div className='dropdown-menu-box' key={index}>
                          {chunk.map((genero, idx) => (
                            <a
                              key={idx}
                              onClick={() => handleCategoryClick(genero)}
                              style={{ cursor: 'pointer', display: 'block' }}
                            >
                              {genero}
                            </a>
                          ))}
                        </div>
                      ))}
                    </div>
                    <Link to={`/categorias`} style={{ cursor: 'pointer', display: 'block', marginLeft: '10px' }}><b>Todos los productos</b></Link>
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
