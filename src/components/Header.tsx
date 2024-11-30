import '../styles/header.css'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { RootType } from '../states/store';
import { selectCartItemCount } from '../states/productSlice';
import { Container, Row, Col, Form, Button, Dropdown } from 'react-bootstrap';
import logoPaginasSelectas from '../assets/images/logo-ux.png'

function Header() {

  const navigate = useNavigate();

  // Para obtener la cantidad de productos del carrito
  const itemCount = useSelector(selectCartItemCount);

  const handleCartClick = () => {
    if (itemCount > 0) {
      navigate('/carrito'); // Si el carrito tiene productos, redirige al detalle de la página de carrito 
    } else {
      navigate('/empty-cart') // Si el carrito esta vacío, redirige a esa página 'carrito vacío'
    }
  }

  const isAuthenticated = useSelector((state: RootType) => state.authReducer.isAuthenticated);
  const user = useSelector((state: RootType) => state.authReducer.user);

  const handleUserIconClick = () => {
    if (!isAuthenticated) {
      navigate('/login');
    } else if (user?.rol === 'admin') {
      navigate('/admin');
    } else if (user?.rol === 'user') {
      navigate('/user');
    }
  };

  return (

    <header id="header">

      <div className="container-header">

        <Container fluid className="header-top">
          <Row className="container-herramientas">
            <Col md={6} className="d-flex align-items-center">
              <div className="input-group">
                <Form.Control type="text" placeholder="Busca tus libros aquí" className="header-search-input" />
                <span className="input-group-text bg-white border-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none" className="icon-search-button">
                    <path fillRule="evenodd" clipRule="evenodd" d="M10.2 3.02695C5.89217 3.02695 2.4 6.51913 2.4 10.827C2.4 15.1347 5.89218 18.627 10.2 18.627C14.5078 18.627 18 15.1347 18 10.827C18 6.51913 14.5078 3.02695 10.2 3.02695ZM0 10.827C0 5.19364 4.56669 0.626953 10.2 0.626953C15.8333 0.626953 20.4 5.19364 20.4 10.827C20.4 13.2154 19.5791 15.412 18.204 17.1502L23.6473 22.5772C24.1166 23.0451 24.1177 23.8049 23.6498 24.2742C23.1819 24.7435 22.4221 24.7447 21.9527 24.2768L16.505 18.8454C14.7697 20.2118 12.5801 21.027 10.2 21.027C4.56669 21.027 0 16.4602 0 10.827Z" fill="currentColor" />
                  </svg>
                </span>
              </div>
            </Col>

            <Col md={3} className="d-flex gap-3">
              <Button variant="none" className="header-icon" onClick={handleUserIconClick}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none" className="icon-user-button">
                  <path fillRule="evenodd" clipRule="evenodd" d="M0 12.627C0 5.99954 5.37259 0.626953 12 0.626953C18.6275 0.626953 24 5.99954 24 12.627C24 19.2544 18.6275 24.627 12 24.627C5.37259 24.627 0 19.2544 0 12.627ZM12 2.47311C6.39219 2.47311 1.84615 7.01914 1.84615 12.627C1.84615 15.0074 2.6653 17.1965 4.03709 18.9278C4.23562 18.3563 4.51608 17.8042 4.86848 17.3146C5.62448 16.264 6.79695 15.3962 8.30769 15.3962H15.6923C17.2031 15.3962 18.3755 16.264 19.1315 17.3146C19.4839 17.8043 19.7644 18.3563 19.9629 18.9279C21.3347 17.1966 22.1538 15.0074 22.1538 12.627C22.1538 7.01914 17.6079 2.47311 12 2.47311ZM18.4378 20.4794C18.3578 19.778 18.0775 19.0106 17.6331 18.3929C17.1054 17.6598 16.4318 17.2423 15.6923 17.2423H8.30769C7.56824 17.2423 6.89456 17.6598 6.36695 18.3929C5.92246 19.0106 5.64219 19.778 5.56217 20.4794C7.31429 21.9176 9.55634 22.7808 12 22.7808C14.4437 22.7808 16.6857 21.9176 18.4378 20.4794ZM7.38462 8.93465C7.38462 6.38565 9.45093 4.31926 12 4.31926C14.5491 4.31926 16.6154 6.38565 16.6154 8.93465C16.6154 11.4837 14.5491 13.55 12 13.55C9.45094 13.55 7.38462 11.4837 7.38462 8.93465ZM12 6.16541C10.4705 6.16541 9.23077 7.40524 9.23077 8.93465C9.23077 10.4641 10.4705 11.7039 12 11.7039C13.5295 11.7039 14.7692 10.4641 14.7692 8.93465C14.7692 7.40524 13.5295 6.16541 12 6.16541Z" fill="currentColor" />
                </svg>
              </Button>
              <Button variant="none" className="header-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none" className="icon-bell-button">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12.0001 0.626953C7.40153 0.626953 3.52085 4.43659 3.52085 9.06864C3.52085 11.4236 2.92443 13.8138 2.31021 15.6421C2.00506 16.5505 1.7 17.3071 1.47212 17.8346C1.35828 18.0982 1.264 18.3039 1.19899 18.4421C1.1665 18.5112 1.14135 18.5634 1.12476 18.5974L1.10646 18.6347L1.10241 18.6428L1.10178 18.644C0.955414 18.9348 0.967588 19.2825 1.13393 19.5618C1.30032 19.8411 1.59695 20.0116 1.91667 20.0116L6.73913 20.0116C7.03169 22.6077 9.27545 24.627 12 24.627C14.7245 24.627 16.9683 22.6077 17.2609 20.0116L22.0835 20.0116C22.3894 20.0116 22.6751 19.8554 22.8453 19.5953C23.0154 19.3352 23.0473 19.0049 22.9307 18.7155L22.9248 18.7008L22.905 18.6508C22.8873 18.6062 22.8611 18.5394 22.8276 18.4526C22.7604 18.2789 22.6639 18.0252 22.5479 17.7086C22.3156 17.0747 22.006 16.1915 21.6968 15.1944C21.0682 13.1673 20.4793 10.787 20.4793 9.06864C20.4793 4.43659 16.5986 0.626953 12.0001 0.626953ZM15.3305 20.0116H8.66953C8.94737 21.6039 10.3557 22.7808 12 22.7808C13.6443 22.7808 15.0526 21.6039 15.3305 20.0116ZM20.747 18.1356H3.34168C3.55269 17.6224 3.79836 16.9831 4.04398 16.252C4.69019 14.3284 5.35419 11.7162 5.35419 9.06864C5.35419 5.52663 8.36047 2.50288 12.0001 2.50288C15.6397 2.50288 18.6459 5.52663 18.6459 9.06864C18.6459 11.1021 19.3175 13.7244 19.9493 15.7618C20.2341 16.6801 20.5186 17.5036 20.747 18.1356Z" fill="currentColor" />
                </svg>
              </Button>
              <Button variant="none" className="header-icon" onClick={handleCartClick} >
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="26" viewBox="0 0 25 26" fill="none" className="icon-shoppingCart-button">
                  <path fillRule="evenodd" clipRule="evenodd" d="M0.923085 0.571411C0.413279 0.571411 0 1.0309 0 1.59771C0 2.16452 0.413279 2.62401 0.923085 2.62401H3.0375L3.25474 4.31471C3.25636 4.32957 3.25825 4.34434 3.26043 4.359L4.75386 15.9819C4.75549 15.9969 4.7574 16.0118 4.75961 16.0266L5.25629 19.8921C5.32125 20.3977 5.71072 20.7733 6.17009 20.7733H6.52868C6.09407 21.2884 5.83008 21.9668 5.83008 22.7101C5.83008 24.3211 7.06992 25.627 8.59933 25.627C10.1288 25.627 11.3686 24.3211 11.3686 22.7101C11.3686 21.9668 11.1046 21.2884 10.67 20.7733H15.7591C15.3245 21.2884 15.0605 21.9668 15.0605 22.7101C15.0605 24.3211 16.3004 25.627 17.8298 25.627C19.3592 25.627 20.5991 24.3211 20.5991 22.7101C20.5991 21.6423 20.0543 20.7085 19.2415 20.2002C19.3021 20.0635 19.3362 19.9097 19.3362 19.747C19.3362 19.1802 18.9229 18.7207 18.4131 18.7207H6.97068L6.73471 16.8841H19.579C19.9763 16.8841 20.3291 16.6015 20.4547 16.1824L23.9527 4.51501C24.0466 4.20204 23.9994 3.858 23.8259 3.59038C23.6524 3.32275 23.3738 3.16417 23.077 3.16417H4.97182L4.7519 1.45257C4.68693 0.946964 4.29746 0.571411 3.83809 0.571411H0.923085ZM5.23556 5.21676L6.47097 14.8315H18.9137L21.7963 5.21676H5.23556ZM8.59933 21.4476C7.93734 21.4476 7.4007 22.0128 7.4007 22.7101C7.4007 23.4074 7.93734 23.9726 8.59933 23.9726C9.26135 23.9726 9.79797 23.4074 9.79797 22.7101C9.79797 22.0128 9.26135 21.4476 8.59933 21.4476ZM16.6312 22.7101C16.6312 22.0128 17.1678 21.4476 17.8298 21.4476C18.4918 21.4476 19.0284 22.0128 19.0284 22.7101C19.0284 23.4074 18.4918 23.9726 17.8298 23.9726C17.1678 23.9726 16.6312 23.4074 16.6312 22.7101Z" fill="currentColor" />
                </svg>
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
                <Link to="/mistery-boxes" className="menu-link">Mystery Box</Link>
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
                        <Dropdown.Item href="/categoria/historia"className="dropdown-item-categoria">Historia</Dropdown.Item>
                        <Dropdown.Item href="/categoria/fotografia"className="dropdown-item-categoria">Fotografía</Dropdown.Item>
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