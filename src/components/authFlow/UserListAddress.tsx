import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../../styles/user_modify_address.css';
import { useState } from 'react';
import { configuracion } from '../../config/appConfiguration';
import { Link } from 'react-router-dom';
import { IDireccion } from '../../interfaces/IDireccion';
import Button from 'react-bootstrap/esm/Button';
import { jwtDecode } from 'jwt-decode';
import { useFetchGetAddressEnvioFacturacion } from '../../hooks/useFetchUser';

const UserListAddress = () => {
    const [selectedAddress, setSelectedAddress] = useState<IDireccion | null>(null);
    const [originalAddress, setOriginalAddress] = useState<IDireccion | null>(null);

    const loggedInUser = JSON.parse(localStorage.getItem('__redux__user__') || '{}');
    const decodedToken = jwtDecode<{ idUsuario: number; rol: string; exp: number }>(loggedInUser.token);

    const {
        dataEnvio: addressesEnvio,
        dataFacturacion: addressesFacturacion,
        loading: loadingAddress,
        error: errorAddress
    } = useFetchGetAddressEnvioFacturacion(configuracion.urlJsonServerBackendUsers, decodedToken.idUsuario); // Sin el tipo genérico

    if (loadingAddress) return <p>Cargando datos de las direcciones del usuario...</p>;
    if (errorAddress) return <p>Error en la consulta de las direcciones del usuario: {errorAddress}</p>;

    const handleAddressChangeEnvio = (addressId: number) => {
        const selected = addressesEnvio?.find((addr) => addr.idDireccion === addressId);
        if (selected) {
            setSelectedAddress(selected);
            setOriginalAddress(selected);
        }
    };

    const handleAddressChangeFacturacion = (addressId: number) => {
        const selected = addressesFacturacion?.find((addr) => addr.idDireccion === addressId);
        if (selected) {
            setSelectedAddress(selected);
            setOriginalAddress(selected);
        }
    };

    const handleCancel = () => {
        setSelectedAddress(originalAddress);
    };

    return (
        <Container>
            <Row lg={12}>
                <Col lg={8}>
                    <p className="user-mod-dir-title">Tus direcciones</p>
                </Col>
            </Row>
            <Row lg={12}>
                <Col lg={10}>
                    <p className="user-mod-dir-sub">Escoge tu dirección de despacho</p>
                </Col>
                <Col lg={2}>
                    {addressesEnvio?.length || addressesFacturacion?.length ? (
                        <Link to={`/user/settings/address`}>
                            <Button variant="none" className="direcciones-list-button">Editar dirección</Button>
                        </Link>
                    ) : null}
                </Col>
                {addressesEnvio?.length ? (
                    addressesEnvio.map((address) => (
                        <Col key={address.idDireccion} lg={12} className="d-flex justify-content-start user-mod-dir-radio">
                            <input
                                type="radio"
                                id={`address-envio-${address.idDireccion}`}
                                name="addressEnvio"
                                checked={selectedAddress?.idDireccion === address.idDireccion}
                                onChange={() => handleAddressChangeEnvio(address.idDireccion)}
                            />
                            <label htmlFor={`address-envio-${address.idDireccion}`}>
                                {`${address.calle} ${address.numeroCalle}, ${address.comuna}, ${address.region}`}
                            </label>
                        </Col>
                    ))
                ) : (
                    <p>No existen direcciones de envío registradas.</p>
                )}
                <Col lg={12}>
                    <Link to={`/user/address/add`}>
                        <Button variant="none" className="direcciones-button-new">Agregar dirección</Button>
                    </Link>
                </Col>
                <Col lg={12}>
                    <p className="user-mod-dir-sub">Escoge tu dirección de facturación</p>
                </Col>
                {addressesFacturacion?.length ? (
                    addressesFacturacion.map((address) => (
                        <Col key={address.idDireccion} lg={12} className="d-flex justify-content-start user-mod-dir-radio">
                            <input
                                type="radio"
                                id={`address-facturacion-${address.idDireccion}`}
                                name="addressFacturacion"
                                checked={selectedAddress?.idDireccion === address.idDireccion}
                                onChange={() => handleAddressChangeFacturacion(address.idDireccion)}
                            />
                            <label htmlFor={`address-facturacion-${address.idDireccion}`}>
                                {`${address.calle} ${address.numeroCalle}, ${address.comuna}, ${address.region}`}
                            </label>
                        </Col>
                    ))
                ) : (
                    <p>No existen direcciones de facturación registradas.</p>
                )}
            </Row>
            <div className="user-mod-dir-buttons-container">
                <button type="submit" className="user-mod-dir-cancel" onClick={handleCancel}>Cancelar</button>
            </div>
        </Container>
    );
};

export default UserListAddress;
