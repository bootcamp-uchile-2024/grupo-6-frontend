import '../styles/admin_header.css'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { RootType } from '../states/store';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import logoPaginasSelectas from '../assets/images/logo-ux.png'
import { useEffect, useRef, useState } from 'react';
import { configuracion } from '../config/appConfiguration';
import { ILibro } from '../interfaces/ILibro';

function AdminHeader() {

    const navigate = useNavigate();

    // ESTADO PARA LA BÚSQUEDA
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<ILibro[]>([]);


    const isAuthenticated = useSelector((state: RootType) => state.authReducer.isAuthenticated);
    const user = useSelector((state: RootType) => state.authReducer.user);

    const handleUserIconClick = () => {
        console.log('isAuthenticated:', isAuthenticated);
        console.log('user role:', user?.rol);

        if (!isAuthenticated) {
            navigate('/login');
        } else if (user?.rol === 'ADMIN') {
            navigate('/admin');
        } else if (user?.rol === 'USER') {
            navigate('/user');
        }
    };

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

    return (

        <header id="header-admin">

            <div className="container-header-admin">

                <Container fluid className="header-top-admin">
                    <Row className="container-herramientas-admin justify-content-end">
                        <Col md={6} className="d-flex align-items-center justify-content-end gap-3">
                            <div className="input-group-admin">
                                <Form.Control
                                    type="text"
                                    placeholder="Buscar productos"
                                    className="header-search-input-admin"
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

                        <Col md={3} className="d-flex gap-3">
                            <Button
                                variant="none"
                                className="header-icon-admin"
                                onClick={() => {
                                    handleUserIconClick();
                                }}
                            >

                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none" className="icon-user-button">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M0 12.627C0 5.99954 5.37259 0.626953 12 0.626953C18.6275 0.626953 24 5.99954 24 12.627C24 19.2544 18.6275 24.627 12 24.627C5.37259 24.627 0 19.2544 0 12.627ZM12 2.47311C6.39219 2.47311 1.84615 7.01914 1.84615 12.627C1.84615 15.0074 2.6653 17.1965 4.03709 18.9278C4.23562 18.3563 4.51608 17.8042 4.86848 17.3146C5.62448 16.264 6.79695 15.3962 8.30769 15.3962H15.6923C17.2031 15.3962 18.3755 16.264 19.1315 17.3146C19.4839 17.8043 19.7644 18.3563 19.9629 18.9279C21.3347 17.1966 22.1538 15.0074 22.1538 12.627C22.1538 7.01914 17.6079 2.47311 12 2.47311ZM18.4378 20.4794C18.3578 19.778 18.0775 19.0106 17.6331 18.3929C17.1054 17.6598 16.4318 17.2423 15.6923 17.2423H8.30769C7.56824 17.2423 6.89456 17.6598 6.36695 18.3929C5.92246 19.0106 5.64219 19.778 5.56217 20.4794C7.31429 21.9176 9.55634 22.7808 12 22.7808C14.4437 22.7808 16.6857 21.9176 18.4378 20.4794ZM7.38462 8.93465C7.38462 6.38565 9.45093 4.31926 12 4.31926C14.5491 4.31926 16.6154 6.38565 16.6154 8.93465C16.6154 11.4837 14.5491 13.55 12 13.55C9.45094 13.55 7.38462 11.4837 7.38462 8.93465ZM12 6.16541C10.4705 6.16541 9.23077 7.40524 9.23077 8.93465C9.23077 10.4641 10.4705 11.7039 12 11.7039C13.5295 11.7039 14.7692 10.4641 14.7692 8.93465C14.7692 7.40524 13.5295 6.16541 12 6.16541Z" fill="currentColor" />
                                </svg>
                            </Button>
                        </Col>
                    </Row>
                </Container>

                <Container fluid className="header-nav-admin">
                    <Row className="container-nav-admin">
                        <Col className="col-nav-admin">
                            <nav className="menu-header-admin">
                                <Link to="/admin/userslist" className="menu-link">Usuarios</Link>
                                <Link to="/admin/product" className="menu-link">Productos</Link>
                                <Link to="/not-found-admin" className="menu-link">Inventario</Link>
                                <Link to="/not-found-admin" className="menu-link">Proveedores</Link>
                                <Link to="/not-found-admin" className="menu-link">Pedidos</Link>
                            </nav>
                        </Col>
                    </Row>
                </Container>

                <Link to="/admin">
                    <img src={logoPaginasSelectas} alt="Páginas selectas" className="header-logo-admin" />
                </Link>

            </div>


        </header>

    );
};

export default AdminHeader;