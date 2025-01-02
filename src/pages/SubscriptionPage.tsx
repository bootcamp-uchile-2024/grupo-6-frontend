import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { MainLayout } from "../layouts/MainLayout";
import blueBook from '../assets/images/subs-blue-book.png'
import redBook from '../assets/images/subs-red-book.png'
import greenBook from '../assets/images/subs-green-book.png'
import '../styles/subscription.css'

interface SubscriptionProps {
    title: string;
}

export const SubscriptionPage = (props: SubscriptionProps) => {
    document.title = props.title;

    return (
        <MainLayout>
            <Container className='subs-container' style={{ marginBottom: '197px' }}>
                <Row>
                    <Col lg={12}>
                        <p className='subs-title'>Suscripciones</p>
                    </Col>
                </Row>

                <Row className='subs-cards-container'>
                    <Col lg={3} className='subs-card'>
                        <div className='subs-img-box'>
                            <img src={redBook} alt="" />
                        </div>
                        <div className='subs-card-info'>
                            <p className='subs-card-title'>Mensual</p>
                            <p className='subs-list'>Descripción</p>
                            <ul className='subs-list'>
                                <li>1 libro</li>
                                <li>1 Accesorio de lectura</li>
                                <li>Club de lectura</li>
                                <li>10% descuento próxima compra</li>
                            </ul>
                        </div>
                        <button className='subs-button'>
                            <b>Precio</b> $24.990/ x mes
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                                <path fillRule="evenodd" clipRule="evenodd" d="M0.92308 0C0.413277 0 0 0.435305 0 0.972282C0 1.50926 0.413277 1.94456 0.92308 1.94456H3.03749L3.25473 3.54629C3.25634 3.56037 3.25824 3.57435 3.26042 3.58824L4.75384 14.5994C4.75546 14.6136 4.75738 14.6277 4.75958 14.6418L5.25626 18.3038C5.32123 18.7828 5.71069 19.1386 6.17006 19.1386H6.53517C6.09668 19.6546 5.83005 20.3361 5.83005 21.0832C5.83005 22.6941 7.06989 24 8.59929 24C10.1287 24 11.3685 22.6941 11.3685 21.0832C11.3685 20.3361 11.1019 19.6546 10.6634 19.1386H15.7656C15.3271 19.6546 15.0605 20.3361 15.0605 21.0832C15.0605 22.6941 16.3003 24 17.8297 24C19.3592 24 20.599 22.6941 20.599 21.0832C20.599 20.0188 20.0578 19.0876 19.2494 18.5783C19.305 18.4532 19.3361 18.3136 19.3361 18.1663C19.3361 17.6293 18.9228 17.194 18.413 17.194H6.97065L6.73467 15.4542H19.5789C19.9762 15.4542 20.329 15.1864 20.4546 14.7893L23.9526 3.73604C24.0465 3.43954 23.9993 3.11362 23.8258 2.86007C23.6523 2.60653 23.3736 2.4563 23.0769 2.4563H4.9718L4.75187 0.83478C4.68691 0.355787 4.29744 0 3.83807 0H0.92308ZM5.23553 4.40086L6.47093 13.5096H18.9136L21.7962 4.40086H5.23553ZM8.59929 19.8206C7.9373 19.8206 7.40066 20.3859 7.40066 21.0832C7.40066 21.7804 7.9373 22.3457 8.59929 22.3457C9.2613 22.3457 9.79792 21.7805 9.79792 21.0832C9.79792 20.3859 9.2613 19.8206 8.59929 19.8206ZM16.6311 21.0832C16.6311 20.3859 17.1677 19.8206 17.8297 19.8206C18.4917 19.8206 19.0283 20.3859 19.0283 21.0832C19.0283 21.7805 18.4917 22.3457 17.8297 22.3457C17.1677 22.3457 16.6311 21.7805 16.6311 21.0832Z" fill="#806259" />
                            </svg>
                        </button>
                    </Col>

                    <Col lg={3} className='subs-card'>
                        <div className='subs-img-box'>
                            <img src={greenBook} alt="" />
                        </div>
                        <div className='subs-card-info'>
                            <p className='subs-card-title'>3 meses por adelantado</p>
                            <p className='subs-list'>Descripción</p>
                            <ul className='subs-list'>
                                <li>1 libro</li>
                                <li>1 Accesorio de lectura</li>
                                <li>Club de lectura</li>
                                <li>10% descuento próxima compra</li>
                            </ul>
                        </div>
                        <button className='subs-button'>
                            <b>Precio</b> $21.990 /x mes
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                                <path fillRule="evenodd" clipRule="evenodd" d="M0.92308 0C0.413277 0 0 0.435305 0 0.972282C0 1.50926 0.413277 1.94456 0.92308 1.94456H3.03749L3.25473 3.54629C3.25634 3.56037 3.25824 3.57435 3.26042 3.58824L4.75384 14.5994C4.75546 14.6136 4.75738 14.6277 4.75958 14.6418L5.25626 18.3038C5.32123 18.7828 5.71069 19.1386 6.17006 19.1386H6.53517C6.09668 19.6546 5.83005 20.3361 5.83005 21.0832C5.83005 22.6941 7.06989 24 8.59929 24C10.1287 24 11.3685 22.6941 11.3685 21.0832C11.3685 20.3361 11.1019 19.6546 10.6634 19.1386H15.7656C15.3271 19.6546 15.0605 20.3361 15.0605 21.0832C15.0605 22.6941 16.3003 24 17.8297 24C19.3592 24 20.599 22.6941 20.599 21.0832C20.599 20.0188 20.0578 19.0876 19.2494 18.5783C19.305 18.4532 19.3361 18.3136 19.3361 18.1663C19.3361 17.6293 18.9228 17.194 18.413 17.194H6.97065L6.73467 15.4542H19.5789C19.9762 15.4542 20.329 15.1864 20.4546 14.7893L23.9526 3.73604C24.0465 3.43954 23.9993 3.11362 23.8258 2.86007C23.6523 2.60653 23.3736 2.4563 23.0769 2.4563H4.9718L4.75187 0.83478C4.68691 0.355787 4.29744 0 3.83807 0H0.92308ZM5.23553 4.40086L6.47093 13.5096H18.9136L21.7962 4.40086H5.23553ZM8.59929 19.8206C7.9373 19.8206 7.40066 20.3859 7.40066 21.0832C7.40066 21.7804 7.9373 22.3457 8.59929 22.3457C9.2613 22.3457 9.79792 21.7805 9.79792 21.0832C9.79792 20.3859 9.2613 19.8206 8.59929 19.8206ZM16.6311 21.0832C16.6311 20.3859 17.1677 19.8206 17.8297 19.8206C18.4917 19.8206 19.0283 20.3859 19.0283 21.0832C19.0283 21.7805 18.4917 22.3457 17.8297 22.3457C17.1677 22.3457 16.6311 21.7805 16.6311 21.0832Z" fill="#806259" />
                            </svg>
                        </button>
                    </Col>

                    <Col lg={3} className='subs-card'>
                        <div className='subs-img-box'>
                            <img src={blueBook} alt="" />
                        </div>
                        <div className='subs-card-info'>
                            <p className='subs-card-title'>6 meses por adelantado</p>
                            <p className='subs-list'>Descripción</p>
                            <ul className='subs-list'>
                                <li>1 libro</li>
                                <li>1 Accesorio de lectura</li>
                                <li>Club de lectura</li>
                                <li>10% descuento próxima compra</li>
                            </ul>
                        </div>
                        <button className='subs-button'>
                            <b>Precio</b> $20.990 /x mes
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                                <path fillRule="evenodd" clipRule="evenodd" d="M0.92308 0C0.413277 0 0 0.435305 0 0.972282C0 1.50926 0.413277 1.94456 0.92308 1.94456H3.03749L3.25473 3.54629C3.25634 3.56037 3.25824 3.57435 3.26042 3.58824L4.75384 14.5994C4.75546 14.6136 4.75738 14.6277 4.75958 14.6418L5.25626 18.3038C5.32123 18.7828 5.71069 19.1386 6.17006 19.1386H6.53517C6.09668 19.6546 5.83005 20.3361 5.83005 21.0832C5.83005 22.6941 7.06989 24 8.59929 24C10.1287 24 11.3685 22.6941 11.3685 21.0832C11.3685 20.3361 11.1019 19.6546 10.6634 19.1386H15.7656C15.3271 19.6546 15.0605 20.3361 15.0605 21.0832C15.0605 22.6941 16.3003 24 17.8297 24C19.3592 24 20.599 22.6941 20.599 21.0832C20.599 20.0188 20.0578 19.0876 19.2494 18.5783C19.305 18.4532 19.3361 18.3136 19.3361 18.1663C19.3361 17.6293 18.9228 17.194 18.413 17.194H6.97065L6.73467 15.4542H19.5789C19.9762 15.4542 20.329 15.1864 20.4546 14.7893L23.9526 3.73604C24.0465 3.43954 23.9993 3.11362 23.8258 2.86007C23.6523 2.60653 23.3736 2.4563 23.0769 2.4563H4.9718L4.75187 0.83478C4.68691 0.355787 4.29744 0 3.83807 0H0.92308ZM5.23553 4.40086L6.47093 13.5096H18.9136L21.7962 4.40086H5.23553ZM8.59929 19.8206C7.9373 19.8206 7.40066 20.3859 7.40066 21.0832C7.40066 21.7804 7.9373 22.3457 8.59929 22.3457C9.2613 22.3457 9.79792 21.7805 9.79792 21.0832C9.79792 20.3859 9.2613 19.8206 8.59929 19.8206ZM16.6311 21.0832C16.6311 20.3859 17.1677 19.8206 17.8297 19.8206C18.4917 19.8206 19.0283 20.3859 19.0283 21.0832C19.0283 21.7805 18.4917 22.3457 17.8297 22.3457C17.1677 22.3457 16.6311 21.7805 16.6311 21.0832Z" fill="#806259" />
                            </svg>
                        </button>
                    </Col>
                </Row>
            </Container>
        </MainLayout>
    );
};