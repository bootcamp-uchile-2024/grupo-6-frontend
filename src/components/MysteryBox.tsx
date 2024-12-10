import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import mysteryBoxMujer from '../assets/images/mystery-box-mujer.png'
import '../styles/mystery_box.css'
import mysteryBoxHongos from '../assets/images/mystery-box-hongos.png'
import mysteryBoxCarta from '../assets/images/mystery-box-carta.png'
import Dropdown from 'react-bootstrap/Dropdown';

export const MysteryBox = () => {
    return (
        <Container className='mystery-container'>
            <Row>
                <Col lg={12} className='d-flex justify-content-center align-items-center'>
                    <h1>Mystery Box</h1>
                </Col>
            </Row>

            <Row className='d-flex justify-content-center align-items-center mystery-info'>
                <Col lg={2}>
                    <img src={mysteryBoxMujer} alt="" />
                </Col>
                <Col lg={6}>
                    <p>Estás a punto de adquirir tu Mystery Box, la que recibirás mes a mes. Sigue los pasos y comienza esta ¡nueva experiencia de lectura!</p>
                </Col>
            </Row>

            <Row className='d-flex justify-content-center align-items-baseline mystery-select'>
                <Col lg={4}>
                    <p>Selecciona el género literario que te gusta</p>
                </Col>
                <Col lg={3}>

                    <Dropdown className='mystery-dropdown'>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            Romance
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <div>
                                <Dropdown.Item href="#/action-1">Novelas</Dropdown.Item>
                                <Dropdown.Item href="#/action-2">Deporte</Dropdown.Item>
                                <Dropdown.Item href="#/action-3">Clásicos</Dropdown.Item>
                                <Dropdown.Item href="#/action-4">Diseño</Dropdown.Item>
                                <Dropdown.Item href="#/action-5">Infantil</Dropdown.Item>
                                <Dropdown.Item href="#/action-6">Poesía</Dropdown.Item>
                            </div>
                            <div>
                                <Dropdown.Item href="#/action-7">Literatura</Dropdown.Item>
                                <Dropdown.Item href="#/action-8">Biografías</Dropdown.Item>
                                <Dropdown.Item href="#/action-9">Arquitectura</Dropdown.Item>
                                <Dropdown.Item href="#/action-10">Arte</Dropdown.Item>
                                <Dropdown.Item href="#/action-11">Juvenil</Dropdown.Item>
                                <Dropdown.Item href="#/action-12">Romance</Dropdown.Item>
                            </div>
                            <div>
                                <Dropdown.Item href="#/action-13">Ficción</Dropdown.Item>
                                <Dropdown.Item href="#/action-14">Misterio</Dropdown.Item>
                                <Dropdown.Item href="#/action-15">Autoayuda</Dropdown.Item>
                                <Dropdown.Item href="#/action-16">Historia</Dropdown.Item>
                                <Dropdown.Item href="#/action-17">Fotografía</Dropdown.Item>
                                <Dropdown.Item href="#/action-18">Terror</Dropdown.Item>
                            </div>
                            <div>
                                <Dropdown.Item href="#/action-19">Ilustración</Dropdown.Item>
                                <Dropdown.Item href="#/action-20">Gestión</Dropdown.Item>
                                <Dropdown.Item href="#/action-21">Estilo de vida</Dropdown.Item>
                                <Dropdown.Item href="#/action-22">Ciencias</Dropdown.Item>
                                <Dropdown.Item href="#/action-23">Todos los productos</Dropdown.Item>
                            </div>
                        </Dropdown.Menu>
                    </Dropdown>

                </Col>
            </Row>

            <Row className='d-flex justify-content-center align-items-center mystery-text'>
                <Col lg={12}>
                    <p>¿Qué Mystery Box quieres recibir?</p>
                </Col>
            </Row>

            <Row className='d-flex justify-content-center align-items-baseline mystery-card-container'>
                <Col lg={3}>
                    <div className='mystery-card essential'>
                        <img src={mysteryBoxHongos} alt="" />
                        <div className="radio-container">
                            <input type="radio" name="mystery-box" id="essential" />
                            <label htmlFor="essential">Mystery Box Essential</label>
                        </div>
                        <p>1 Libro</p>
                        <p>1 Marca Páginas</p>
                        <p className='precio'>$18.000</p>
                    </div>
                </Col>
                <Col lg={3}>
                    <div className='mystery-card supreme'>
                        <img src={mysteryBoxCarta} alt="" />
                        <div className="radio-container">
                            <input type="radio" name="mystery-box" id="supreme" />
                            <label htmlFor="supreme">Mystery Box Supreme</label>
                        </div>
                        <p>1 Libro</p>
                        <p>1 Marca Páginas</p>
                        <p>Artículo Booker</p>
                        <p>Club de Lectura</p>
                        <p className='precio'>$27.000</p>
                    </div>
                </Col>
            </Row>


            <Row className='d-flex justify-content-center align-items-center mystery-text'>
                <Col>
                    <p>¿Qué Mystery Box quieres recibir?</p>
                </Col>
            </Row>

            <Row className='d-flex justify-content-center align-items-center mystery-checkbox'>
                <Col lg={3}>
                    <input type="checkbox" name="regalo" id="regalo" />
                    <label htmlFor="regalo">Es un regalo uwu</label>
                </Col>
                <Col lg={3}>
                    <input type="checkbox" name="suscripcion" id="suscripcion" />
                    <label htmlFor="suscripcion">Es una suscripción</label>
                </Col>
            </Row>

            <Row className='d-flex justify-content-center align-items-center mystery-button'>
                <Col lg={12} className='d-flex justify-content-center align-items-center'>
                    <button>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M0 0.972282C0 0.435305 0.413279 0 0.923085 0H3.83809C4.29746 0 4.68693 0.355787 4.7519 0.83478L4.97182 2.4563H23.077C23.3738 2.4563 23.6524 2.60653 23.8259 2.86007C23.9994 3.11362 24.0466 3.43954 23.9527 3.73604L20.4547 14.7893C20.3291 15.1864 19.9763 15.4542 19.579 15.4542H6.73471L6.97068 17.194H18.4131C18.9229 17.194 19.3362 17.6293 19.3362 18.1663C19.3362 18.3136 19.3051 18.4532 19.2495 18.5783C20.0579 19.0876 20.5991 20.0188 20.5991 21.0832C20.5991 22.6941 19.3592 24 17.8298 24C16.3004 24 15.0605 22.6941 15.0605 21.0832C15.0605 20.3361 15.3272 19.6546 15.7657 19.1386H10.6635C11.102 19.6546 11.3686 20.3361 11.3686 21.0832C11.3686 22.6941 10.1288 24 8.59933 24C7.06992 24 5.83008 22.6941 5.83008 21.0832C5.83008 20.3361 6.09671 19.6546 6.5352 19.1386H6.17009C5.71072 19.1386 5.32125 18.7828 5.25629 18.3038L4.75961 14.6418C4.7574 14.6277 4.75549 14.6136 4.75386 14.5994L3.26043 3.58824C3.25825 3.57435 3.25636 3.56037 3.25474 3.54629L3.0375 1.94456H0.923085C0.413279 1.94456 0 1.50926 0 0.972282ZM6.47097 13.5096L5.23556 4.40086H21.7963L18.9137 13.5096H6.47097ZM7.4007 21.0832C7.4007 20.3859 7.93734 19.8206 8.59933 19.8206C9.26135 19.8206 9.79797 20.3859 9.79797 21.0832C9.79797 21.7805 9.26135 22.3457 8.59933 22.3457C7.93734 22.3457 7.4007 21.7804 7.4007 21.0832ZM17.8298 19.8206C17.1678 19.8206 16.6312 20.3859 16.6312 21.0832C16.6312 21.7805 17.1678 22.3457 17.8298 22.3457C18.4918 22.3457 19.0284 21.7805 19.0284 21.0832C19.0284 20.3859 18.4918 19.8206 17.8298 19.8206ZM13 5.73685C13.5523 5.73685 14 6.18456 14 6.73685V7.73685H15C15.5523 7.73685 16 8.18456 16 8.73685C16 9.28913 15.5523 9.73685 15 9.73685H14V10.7368C14 11.2891 13.5523 11.7368 13 11.7368C12.4477 11.7368 12 11.2891 12 10.7368V9.73685H11C10.4477 9.73685 10 9.28913 10 8.73685C10 8.18456 10.4477 7.73685 11 7.73685H12V6.73685C12 6.18456 12.4477 5.73685 13 5.73685Z" fill="#545454" />
                        </svg>
                        Agregar al carrito
                    </button>
                </Col>
            </Row>

        </Container>
    )
}